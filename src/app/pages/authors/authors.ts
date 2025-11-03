import { Component, inject, signal } from '@angular/core';
import { Authorsservice, Data } from '../../services/authorsservice';
import { Authservice } from '../../services/authservice';
import { Authorscard } from './authorscard/authorscard';

@Component({
	selector: 'app-authors',
	imports: [Authorscard],
	templateUrl: './authors.html',
	styleUrl: './authors.css',
})
export class Authors {
	private auth = inject(Authservice);
	private authorsService = inject(Authorsservice);

	authorsData = signal<Data | null>(null);
	loading = signal(true);
	error = signal<string | null>(null);

	constructor() {
		console.log('authors logged: ', this.auth.isAuthenticated());
		this.loadAuthors(1);
	}

	loadAuthors(page: number) {
		this.loading.set(true);
		this.error.set(null);

		this.authorsService.getAuthorsPaginated(page).subscribe({
			next: (res: Data) => {
				this.authorsData.set(res);
				this.loading.set(false);
			},
			error: (err) => {
				this.error.set(err.message);
				this.loading.set(false);
			},
		});
	}

	changePage(page: number) {
		this.loadAuthors(page);
	}

	getPages(): number[] {
		const meta = this.authorsData()?.meta;
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
