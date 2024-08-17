import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true;
  } else {
    if (state.url !== '/auth/login') {  // Verificar que no esté intentando recargar la misma página
      router.navigateByUrl('/auth/login').then(() => {
        window.location.reload();  // Recargar solo si es una nueva navegación
      });
    }
    console.log('Usuario no autenticado, redirigiendo a la página de inicio de sesión');
    return false;
  }
};
