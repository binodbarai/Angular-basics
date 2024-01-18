// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpEvent,
//   HttpHandler,
//   HttpRequest,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { ToastService } from '../services/toast.service';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private toast: ToastService) {}
//
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//
//     if (token) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return next.handle(authReq).pipe(
//         catchError((error: HttpErrorResponse) => {
//           console.error('HTTP error occurred:', error);
//           // this.toast.showError(error.message);
//
//           if (error.status === 403) {
//             this.toast.showError("Not a valid request");
//           }
//
//           return throwError(error);
//         })
//       );
//     }
//
//     return next.handle(req);
//   }
// }

import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {ToastService} from "../services/toast.service";
import {Router} from "@angular/router";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  if(localStorage.getItem('token')){
    req = req.clone({
      setHeaders: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
          console.error('HTTP error occurred:', error);
          // this.toast.showError(error.message);

          if (error.status === 403) {
            toast.showError("Invalid request please login again.");
            // router.navigate(['/login']);
          }

          return throwError(error);
        })
  );
};
