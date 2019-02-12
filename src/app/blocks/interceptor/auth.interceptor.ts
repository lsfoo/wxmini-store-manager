import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  protected basePath = 'http://localhost:8080'
  constructor(
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request ||
      !request.url ||
      (/^http/.test(request.url) &&
        !(this.basePath && request.url.startsWith(this.basePath)))
    ) {
      return next.handle(request)
    }

    const token =
      this.localStorage.retrieve('authenticationToken') ||
      this.sessionStorage.retrieve('authenticationToken')
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    } else {
      this.router.navigateByUrl('')
    }
    return next.handle(request)
  }
}
