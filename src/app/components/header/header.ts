import { Component, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { Loginservice } from '../../services/loginservice';

@Component({
	selector: 'app-header',
	imports: [RouterModule],
	templateUrl: './header.html',
	styleUrl: './header.css',
})
export class Header {
	isLoggedIn = computed(() => this.auth.isAuthenticated());

	constructor(
		private auth: Authservice,
		private _router: Router,
		private _loginService: Loginservice,
	) {}

	getLogout() {
		if (this.auth.isAuthenticated()) {
			this._loginService.getLogout().subscribe({
				next: (response) => {
					console.log('Logout', response);
					this.auth.logout();
				},
				error: (error) => {
					console.error('Error logout', error);
					this.auth.logout();
				},
			});
		} else {
			this.auth.logout();
			this._router.navigate(['/logout']);
		}
	}
}
