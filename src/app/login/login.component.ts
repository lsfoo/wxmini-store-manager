import { BsModalRef } from 'ngx-bootstrap'
import { JwtService } from './../core/jwt.service'
import { JWTToken } from './../../../shared/model/jWTToken'
import { LoginVM } from './../../../shared/model/loginVM'
import { Component, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginVM: LoginVM = { username: '', password: '', rememberMe: true }
  jwtToken: JWTToken

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit() {}
  login() {
    this.jwtService.login(this.loginVM).subscribe(
      (res: JWTToken) => {
        this.bsModalRef.hide()
      },
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }
}
