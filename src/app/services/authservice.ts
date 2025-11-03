import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';

export interface User {
	user_id: number;
	name: string;
	email: string;
	role: string;
}

@Injectable({
	providedIn: 'root',
})
export class Authservice {
	private _isAuthenticated = signal<boolean>(false);
	private _token = signal<string | null>(null);
	private _user = signal<User>({ user_id: 0, name: '', email: '', role: '' });
	private platformId = inject(PLATFORM_ID);

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			this.restoreSession();
		}
	}

	isAuthenticated() {
		return this._isAuthenticated();
	}

	get token() {
		return this._token();
	}

	get user() {
		return this._user();
	}
	login(token: string, user: User) {
		this._token.set(token);
		this._user.set(user);
		this._isAuthenticated.set(true);
		localStorage.setItem('auth_token', token);
		localStorage.setItem('auth_user', JSON.stringify(user));
	}
	logout() {
		this._token.set(null);
		this._user.set({ user_id: 0, name: '', email: '', role: '' });
		this._isAuthenticated.set(false);
		localStorage.removeItem('auth_token');
		localStorage.removeItem('auth_user');
	}
	private restoreSession() {
		const token = localStorage.getItem('auth_token');
		const user = localStorage.getItem('auth_user');

		if (token && user) {
			this._token.set(token);
			this._user.set(JSON.parse(user));
			this._isAuthenticated.set(true);
		}
	}
}
