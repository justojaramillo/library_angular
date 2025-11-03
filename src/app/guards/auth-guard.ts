import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

export const authGuard: CanActivateFn = () => {
	const auth = inject(Authservice);
	const router = inject(Router);

	if (auth.isAuthenticated()) {
		return true;
	} else {
		router.navigate(['/login']);
		return false;
	}
};
