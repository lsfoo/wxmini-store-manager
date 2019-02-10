import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { JwtService } from 'src/app/core/jwt.service'

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('jwt超时重新获取')
              const loginVM = {
                username: 'admin',
                password: 'admin',
                rememberMe: true
              }
              this.jwtService.login(loginVM)
            }
          }
        }
      )
    )
  }
}
