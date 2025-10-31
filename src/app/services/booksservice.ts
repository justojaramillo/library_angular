import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Author {
	author_id: number;
	name: string;
	nationality: string;
	birth_day: Date;
	books_count: number;
}

export interface Book {
	book_id: number;
	title: string;
	isbn: string;
	category: string;
	stock: number;
	Author: Author;
}

@Injectable({
	providedIn: 'root',
})
export class Booksservice {
	private url = 'http://localhost:8000/api/books';

	constructor(private http: HttpClient) {}

	getBooks(): Observable<Book[]> {
		return this.http.get<Book[]>(this.url);
	}
}
