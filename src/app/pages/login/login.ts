import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { Data, Loginservice, UserAuth } from '../../services/loginservice';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './login.html',
	styleUrl: './login.css',
})
export class Login {
	private auth = inject(Authservice);
	data: Data[] = [];
	private fb = inject(FormBuilder);
	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
	});
	private credential: UserAuth = { email: '', password: '' };
	private _router = inject(Router);

	constructor(private _Login: Loginservice) {}

	//temporal:
	ngOnInit(): void {
		this.setDefaultValues();
	}

	// Método opcional para cambiar valores por defecto
	setDefaultValues() {
		this.loginForm.patchValue({
			email: 'justo@example.com',
			password: '12345678',
		});
	}
	//fin temporal

	get email() {
		return this.loginForm?.controls?.email;
	}
	get password() {
		return this.loginForm?.controls?.password;
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}
		this.credential.email = this.loginForm.value.email ?? '';
		this.credential.password = this.loginForm.value.password ?? '';
		this.getLogin();
	}
	getLogin() {
		this._Login.getLogin(this.credential).subscribe({
			next: (res) => {
				this.auth.login(res.token, res.user);
				this._router.navigate(['/user']);
			},
			error: (error) => {
				console.error('Login error:', error);
			},
		});
	}
}
