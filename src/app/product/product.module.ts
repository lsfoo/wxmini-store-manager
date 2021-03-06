import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProductRoutingModule } from './product-routing.module'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductUpdateComponent } from './product-update/product-update.component'
import { ProductListComponent } from './product-list/product-list.component'

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductUpdateComponent,
    ProductListComponent
  ],
  imports: [CommonModule, ProductRoutingModule]
})
export class ProductModule {}
