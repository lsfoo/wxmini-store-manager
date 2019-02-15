import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { DeskComponent } from './desk/desk.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ListComponent } from './list/list.component'

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'desk',
    component: DeskComponent
  },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
