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

@Injectable({
	providedIn: 'root',
})
export class Authorsservice {
	private url = 'http://localhost:8000/api/authors';

	constructor(private http: HttpClient) {}

	getAuthors(): Observable<Data> {
		return this.http.get<Data>(this.url);
	}
}
