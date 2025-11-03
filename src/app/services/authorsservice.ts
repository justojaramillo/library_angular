import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Author {
	author_id: number;
	name: string;
	nationality: string;
	birth_day: string;
	books_count: number;
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
	data: Author[];
	links: Links;
	meta: Meta;
}

export interface ApiError {
	message: string;
	status: number;
	errors?: unknown;
}

@Injectable({
	providedIn: 'root',
})
export class Authorsservice {
	private url = 'http://localhost:8000/api/authors';

	constructor(private http: HttpClient) {}

	getAuthors(): Observable<Data> {
		return this.http.get<Data>(this.url);
	}
	getAuthorsPaginated(page: number): Observable<Data> {
		return this.http.get<Data>(`${this.url}?page=${page}`);
	}
	getAuthor(id: number): Observable<Author> {
		return this.http.get<Author>(`${this.url}/${id}`);
	}
	createAuthor(author: Author): Observable<Author> {
		const data = { name: author.name, nationality: author.nationality, birt_day: author.birth_day };
		return this.http.post<Author>(this.url, data);
	}
	updateAuthor(id: number, author: Partial<Author>): Observable<Author> {
		return this.http.put<Author>(`${this.url}/${id}`, author);
	}
	deleteAuthor(id: number): Observable<void> {
		return this.http.delete<void>(`${this.url}/${id}`);
	}
}
