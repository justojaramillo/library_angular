import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Author, Authorsservice } from '../../services/authorsservice';
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
	books: Book[] = [];
	authors: Author[] = [];
	books_loading = true;
	books_msg = 'No hay libros';
	authors_loading = true;
	authors_msg = 'No hay authores';

	constructor(
		private _booksService: Booksservice,
		private _authosServices: Authorsservice,
	) {}

	ngOnInit() {
		this.getBooks();
		this.getAuthors();
	}

	public getBooks() {
		this._booksService.getBooks().subscribe((res) => {
			this.books = res.data;
			this.books_loading = false;
		});
	}
	public getAuthors() {
		this._authosServices.getAuthors().subscribe((res) => {
			this.authors = res.data;
			this.authors_loading = false;
		});
	}
}
