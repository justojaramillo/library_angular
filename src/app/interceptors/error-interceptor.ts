import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			let message = 'Ha ocurrido un error inesperado';
			const status = error.status;

			if (error.error instanceof ErrorEvent) {
				// Error del lado del cliente
				message = `Error del cliente: ${error.error.message}`;
			} else {
				// Error del lado del servidor
				switch (status) {
					case 0:
						message = 'No se pudo conectar con el servidor.';
						break;
					case 400:
						message = 'Solicitud inválida.';
						break;
					case 401:
						message = 'No autorizado. Inicia sesión nuevamente.';
						break;
					case 403:
						message = 'Acceso denegado.';
						break;
					case 404:
						message = 'Recurso no encontrado.';
						break;
					case 422:
						message = 'Datos inválidos o faltantes.';
						break;
					case 500:
						message = 'Error interno del servidor.';
						break;
					default:
						message = error.error?.message || `Error ${status}: ${error.message}`;
				}
			}

			// Log opcional
			console.error('Interceptor atrapó un error:', { status, message, error });

			// Devuelve un objeto de error estructurado
			return throwError(() => ({
				message,
				status,
				raw: error,
			}));
		}),
	);
};
