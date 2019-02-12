import { LoginVM } from './../../../shared/model/loginVM'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage'
import { UserJwtControllerService } from 'shared'
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private userJwtControllerService: UserJwtControllerService
  ) {}
  getToken() {
    return (
      this.$localStorage.retrieve('authenticationToken') ||
      this.$sessionStorage.retrieve('authenticationToken')
    )
  }
  login(loginVM: LoginVM): Observable<any> {
    console.log('login')
    return this.userJwtControllerService
      .authorizeUsingPOST(loginVM)
      .pipe(map(authenticateSuccess.bind(this)))
    function authenticateSuccess(resp) {
      const jwt = resp.id_token
      console.log('新token' + jwt)
      this.storeAuthenticationToken(jwt, loginVM.rememberMe)
      return jwt
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt)
    } else {
      this.$sessionStorage.store('authenticationToken', jwt)
    }
  }
  logout(): Observable<any> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken')
      this.$sessionStorage.clear('authenticationToken')
      observer.complete()
    })
  }
}
