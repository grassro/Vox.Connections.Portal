import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PermissionActivate implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if(!route.data['roles']){
            return true;
        }
        var roles = <string[]>route.data['roles'];

        if (roles == null) {
            return true;
        }

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }

        // if no specific roles are required *or* the user has one of the
        // roles required then the route can be activated
        if (roles.length == 0 || this.authService.hasRole(roles)) {
            return true;
        }

        // user has insufficient role permissions so redirect to denied
        this.router.navigate(['/pagenotfound']);
        return false;
    }
}