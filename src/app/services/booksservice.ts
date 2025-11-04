import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from './endpoints';

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
	price: string;
	author: Author;
}
export interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	per_page: number;
	to: number;
	total: number;
}
export interface Links {
	first: string;
	last: string;
	prev: string;
	next: string;
}
export interface Data {
	data: Book[];
	links: Links;
	meta: Meta;
}

@Injectable({
	providedIn: 'root',
})
export class Booksservice {
	//private url = 'http://localhost:8000/api/books';
	private url = endpoints.books;

	constructor(private http: HttpClient) {}

	getBooks(): Observable<Data> {
		return this.http.get<Data>(this.url);
	}
	getBooksPaginated(page: number): Observable<Data> {
		return this.http.get<Data>(`${this.url}?page=${page}`);
	}
}
