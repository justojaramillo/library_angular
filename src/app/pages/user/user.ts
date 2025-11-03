import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Author, Authorsservice } from '../../services/authorsservice';
import { Authservice } from '../../services/authservice';

@Component({
	selector: 'app-user',
	imports: [ReactiveFormsModule, DatePipe],
	templateUrl: './user.html',
	styleUrl: './user.css',
})
export class User {
	private auth = inject(Authservice);
	private authorsService = inject(Authorsservice);
	private fb = inject(FormBuilder);

	authors: Author[] = [];
	selectedAuthor: Author | null = null;
	loading = signal(false);
	message = signal('');
	error = signal('');

	authorForm = this.fb.group({
		author_id: [0, Validators.required],
		name: ['', Validators.required],
		nationality: [''],
		birth_day: [''],
	});
	constructor() {
		console.log('user log: ', this.auth.isAuthenticated());
	}
	ngOnInit(): void {
		this.loadAuthors();
	}
	loadAuthors() {
		this.authorsService.getAuthors().subscribe({
			next: (res) => {
				this.authors = res.data;
			},
			error: (err) => {
				//console.error('Error al cargar autores', err);
				this.error.set(`Error cargando autores: ${err.message}`);
				this.loading.set(false);
			},
		});
	}

	onSubmit() {
		if (this.authorForm.invalid) return;

		const data = this.authorForm.value as Author;

		if (this.selectedAuthor) {
			this.authorsService.updateAuthor(data.author_id, data).subscribe({
				next: () => {
					this.loadAuthors();
					this.resetForm();
				},
				error: (err) => {
					//console.error('Error al crear autor', err);
					this.error.set(`Error cargando autores: ${err.message}`);
					this.loading.set(false);
				},
			});
		} else {
			this.authorsService.createAuthor(data).subscribe({
				next: () => {
					this.loadAuthors();
					this.resetForm();
					console.log('Author data: ', data);
				},
				error: (err) => {
					//console.log('Author data: ', data);
					this.error.set(`Error cargando autores: ${err.message}`);
					this.loading.set(false);
				},
			});
		}
	}

	editAuthor(author: Author) {
		this.selectedAuthor = author;
		const formatedAuthor = { ...author, birth_day: author.birth_day.split('T')[0] };
		this.authorForm.patchValue(formatedAuthor);
	}

	deleteAuthor(id: number) {
		this.authorsService.deleteAuthor(id).subscribe({
			next: () => {
				this.loadAuthors();
				this.resetForm();
			},
			error: (err) => {
				//console.error('Error al crear autor', err);
				this.error.set(`Error cargando autores: ${err.message}`);
				this.loading.set(false);
			},
		});
	}

	resetForm() {
		this.selectedAuthor = null;
		this.authorForm.reset();
	}
}
