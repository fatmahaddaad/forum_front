import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: any[] =[]
  constructor(public jwtHelper: JwtHelperService) { }
  public isAuthenticated(allowedRoles: string[]): boolean {

    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      if (allowedRoles == null || allowedRoles.length === 0) {
        return !this.jwtHelper.isTokenExpired(token);
      }
      const decodeToken = this.jwtHelper.decodeToken(token);
      for (let i = 0; i < decodeToken['roles'].length; i++) {
        const element = decodeToken['roles'][i];
        this.roles.push(allowedRoles.includes(element))
      }
      return !this.jwtHelper.isTokenExpired(token) && this.roles.includes(true);
    }
  }
}
