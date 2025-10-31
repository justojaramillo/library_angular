import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book, Booksservice } from '../../services//booksservice'; // Ajusta la ruta

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './home.html',
	styleUrl: './home.css',
})
export class Home implements OnInit {
	books: Book[] = [];
	loading = true;
	error: string | null = null;

	constructor(private booksService: Booksservice) {}

	ngOnInit() {
		this.booksService.getBooks().subscribe({
			next: (data) => {
				console.log('✅ Datos recibidos del backend:', data);
				this.books = data;
				this.loading = false;
			},
			error: (err) => {
				console.error('❌ Error cargando libros:', err);
				this.error = 'Error al cargar los libros';
				this.loading = false;
			},
		});
	}
}
