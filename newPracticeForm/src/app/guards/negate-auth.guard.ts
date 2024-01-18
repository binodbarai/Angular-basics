import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const NegateAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('token')) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
