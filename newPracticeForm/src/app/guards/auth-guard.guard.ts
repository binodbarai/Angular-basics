import { Injectable, inject } from '@angular/core';
import {

  CanActivateFn,
  Router,

} from '@angular/router';


// @Injectable({
//   providedIn: 'root',
// })
    //******* This is old method ******
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   (sad)
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     if (!localStorage.getItem('token')) {
//       console.log('from inside if condition of auth guard');
//       this.router.navigate(['/login']);
//       return false;
//     }
//     console.log('from out side if condition of auth guard');
//     return true;
//   }
// }


// **** This is new method ****
export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!localStorage.getItem('token') ) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
  return true;
};

