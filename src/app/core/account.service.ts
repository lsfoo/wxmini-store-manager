import { AccountResourceService } from './../../../shared/api/accountResource.service'
import { Injectable } from '@angular/core'
import { SessionStorageService } from 'ngx-webstorage'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: any
  private authenticated = false
  private authenticationState = new Subject<any>()

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private accountResourceService: AccountResourceService
  ) {}

  isAuthenticated(): boolean {
    return this.authenticated
  }
}
