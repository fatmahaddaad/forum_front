import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }
  public isAuthenticated(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      const decodeToken = this.jwtHelper.decodeToken(token);
      return !this.jwtHelper.isTokenExpired(token) && !allowedRoles.includes(decodeToken['roles']);
    }
  }
}
