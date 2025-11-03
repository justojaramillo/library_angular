import { Component, inject, signal } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { Booksservice, Data } from '../../services/booksservice';
import { Bookscard } from './bookscard/bookscard';

@Component({
	selector: 'app-books',
	imports: [Bookscard],
	templateUrl: './books.html',
	styleUrl: './books.css',
})
export class Books {
	private auth = inject(Authservice);
	private booksService = inject(Booksservice);

	booksData = signal<Data | null>(null);
	loading = signal(true);
	error = signal<string | null>(null);

	constructor() {
		console.log('books logged: ', this.auth.isAuthenticated());
		this.loadBooks(1);
	}

	loadBooks(page: number) {
		this.loading.set(true);
		this.booksService.getBooksPaginated(page).subscribe({
			next: (res: Data) => {
				this.booksData.set(res);
				this.loading.set(false);
			},
			error: (err) => {
				this.error.set(err.message);
				this.loading.set(false);
			},
		});
	}
	changePage(page: number) {
		this.loadBooks(page);
	}

	getPages(): number[] {
		const meta = this.booksData()?.meta;
		if (!meta) return [];

		const current = meta.current_page;
		const last = meta.last_page;
		const pages: number[] = [];

		const start = Math.max(1, current - 2);
		const end = Math.min(last, current + 2);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	}
}
