import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardService  {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storageService.isLoggedIn()) {
      return true;  // Usuario autenticado, permitir el acceso a la ruta
    } else {
      this.router.navigate(['auth']);
      return false; // Usuario no autenticado, redirigir a la página de inicio de sesión
    }
  }

}


