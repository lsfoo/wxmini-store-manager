import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap'
import { NgxWebstorageModule } from 'ngx-webstorage'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import 'hammerjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ListComponent } from './list/list.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApiModule, Configuration, ConfigurationParameters } from 'shared'
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor'
import { CartComponent } from './cart/cart.component'
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor'
import { LoadingComponent } from './loading/loading.component'
import { AlertComponent } from './alert/alert.component'
import { DeskComponent } from './desk/desk.component'
import { HomeComponent } from './home/home.component'
import { ProductModule } from './product/product.module'
import { LoginComponent } from './login/login.component'
import { NavComponent } from './nav/nav.component'
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params)
}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CartComponent,
    LoadingComponent,
    AlertComponent,
    DeskComponent,
    HomeComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    NgxWebstorageModule.forRoot(),
    FormsModule,
    ProductModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
