import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Authservice } from '../services/authservice';

export const authInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
	const authService = inject(Authservice);
	const token = authService.token; // obtenemos el token actual

	// Si hay token, clonamos la request con el header Authorization
	if (token) {
		const cloned = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
		///console.log('interceptor_token: ', token);

		return next(cloned);
	}

	// si no hay token, continúa normalmente
	return next(req);
};
