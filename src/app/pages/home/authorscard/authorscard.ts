import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-authorscard',
	imports: [DatePipe],
	templateUrl: './authorscard.html',
	styleUrl: './authorscard.css',
})
export class Authorscard {
	@Input() author!: {
		author_id: number;
		name: string;
		nationality: string;
		birth_day: Date;
		books_count: number;
	};
}
