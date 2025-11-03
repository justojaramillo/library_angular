import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message {
	message: string;
}

export interface UserAuth {
	email: string;
	password: string;
}

export interface User {
	user_id: number;
	name: string;
	email: string;
	role: string;
}

export interface Data {
	message: string;
	user: User;
	token: string;
	token_type: string;
}

@Injectable({
	providedIn: 'root',
})
export class Loginservice {
	private url = 'http://localhost:8000/api/';

	constructor(private http: HttpClient) {}

	getLogin(credential: UserAuth): Observable<Data> {
		return this.http.post<Data>(`${this.url}login`, credential);
	}
	getLogout(): Observable<Message> {
		return this.http.post<Message>(`${this.url}logout`, {});
	}
}
