import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PortalGuardGuard implements CanActivate {
  authenticated = false;
  constructor(private auth: AuthService, private router: Router) {}

  authfunc(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.auth().subscribe({
        next: (response) => {
          if (response.is_active == true) {
            this.authenticated = true;
          } else {
            this.authenticated = false;
          }
          resolve(this.authenticated);
        },
        error: (error) => {
          this.authenticated = false;
          resolve(this.authenticated); // Or you can reject the promise by calling `reject(false)` if needed.
        },
      });
    });
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const authenticated = await this.authfunc();

    if (authenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
