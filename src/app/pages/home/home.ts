import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Author, Authorsservice } from '../../services/authorsservice';
import { Authservice } from '../../services/authservice';
import { Book, Booksservice } from '../../services//booksservice';
import { Authorscard } from './authorscard/authorscard';
import { Bookscard } from './bookscard/bookscard'; // Ajusta la ruta

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, Bookscard, Authorscard],
	templateUrl: './home.html',
	styleUrl: './home.css',
})
export class Home implements OnInit {
	private auth = inject(Authservice);
	private booksService = inject(Booksservice);
	private authorsService = inject(Authorsservice);

	books = signal<Book[]>([]);
	authors = signal<Author[]>([]);
	booksLoading = signal(true);
	authorsLoading = signal(true);
	booksError = signal<string | null>(null);
	authorsError = signal<string | null>(null);

	constructor() {
		console.log('home log: ', this.auth.isAuthenticated());
	}

	ngOnInit() {
		this.getBooks();
		this.getAuthors();
	}

	public getBooks() {
		this.booksService.getBooks().subscribe({
			next: (res) => {
				this.books.set(res.data);
				this.booksLoading.set(false);
			},
			error: (err: Error) => {
				this.booksError.set(err.message);
				this.booksLoading.set(false);
			},
		});
	}
	public getAuthors() {
		this.authorsService.getAuthors().subscribe({
			next: (res) => {
				this.authors.set(res.data);
				this.authorsLoading.set(false);
			},
			error: (err: Error) => {
				this.authorsError.set(err.message);
				this.authorsLoading.set(false);
			},
		});
	}
}
