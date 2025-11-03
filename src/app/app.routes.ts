import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Authors } from './pages/authors/authors';
import { Books } from './pages/books/books';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { User } from './pages/user/user';

export const routes: Routes = [
	{ path: '', component: Home },
	{ path: 'books', component: Books },
	{ path: 'authors', component: Authors },
	{ path: 'login', component: Login },
	//{ path: 'user', component: User, canActivate: [authGuard] },
	{ path: 'user', component: User },
	{ path: '**', redirectTo: '' },
];
