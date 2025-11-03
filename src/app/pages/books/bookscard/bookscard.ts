import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-bookscard',
	imports: [CurrencyPipe],
	templateUrl: './bookscard.html',
	styleUrl: './bookscard.css',
})
export class Bookscard {
	@Input() book!: {
		book_id: number;
		title: string;
		isbn: string;
		category: string;
		stock: number;
		price: string;
	};
}
