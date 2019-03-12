import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const allowedRoles = next.data.allowedRoles;
    if (!this.auth.isAuthenticated(allowedRoles)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
