import { JwtService } from './../core/jwt.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap'
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  loginState: Boolean = true
  bsModalRef: BsModalRef
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private bsModalService: BsModalService
  ) {
    if (jwtService.getToken()) {
      this.loginState = false
    }
  }

  ngOnInit() {}
  logout() {
    this.jwtService.logout().subscribe()
    this.router.navigateByUrl('')
  }
  login() {
    this.bsModalRef = this.bsModalService.show(LoginComponent)
    this.bsModalRef.content.closeBtnName = 'Close'
  }
  isAuthenticated() {
    if (this.jwtService.getToken()) {
      return true
    } else {
      return false
    }
  }
}
