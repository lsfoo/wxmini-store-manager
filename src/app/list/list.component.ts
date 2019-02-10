import { OrderDetailsResourceService } from './../../../shared/api/orderDetailsResource.service';
import { DeskResourceService } from './../../../shared/api/deskResource.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CategoryResourceService,
  ProductResourceService,
  OrderFormResourceService,
  SpecsResourceService,
  OrderForm,
  Product,
  Category,
  JWTToken,
  LoginVM,
  OrderDetails,
} from 'shared';
import { JwtService } from '../core/jwt.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categories: Array<Category> = [];
  products: Array<Product> = [];
  orderDetailsList: Array<OrderDetails> = [];
  orderForm: OrderForm = { totalMoney: 0, orderDetails: []} ;
  jwtToken: JWTToken;
  loginVM: LoginVM;
  showCart: Boolean;
  loading: Boolean;
  alert: Boolean;
  alertMsg: string;
  constructor(
    private categoryResourceService: CategoryResourceService,
    private productResourceService: ProductResourceService,
    private jwtService: JwtService,
    private specsResourceService: SpecsResourceService,
    private orderFormResourceService: OrderFormResourceService,
    private deskResourceService: DeskResourceService,
    private orderDetailsResourceService: OrderDetailsResourceService,
  ) {
    this.loading = true;
    this.showCart = false;
    this.alert = false;
    this.loginVM = {
      username: 'admin',
      password: 'admin',
      rememberMe: true
    };
    jwtService.login(this.loginVM).subscribe(res => {
      const jwt = jwtService.getToken();
      console.log('jwt' + jwt);
      this.categoryResourceService.getAllCategoriesUsingGET().subscribe(res => {
        this.categories = res;
      });
      this.getAll();

    });
    this.getDesk();
  }

  ngOnInit() { }
  openCartModal() {
    this.showCart = true;
  }
  closeCartModal(orderDetails) {
    this.showCart = false;
  }
  getAll() {

    this.loading = true;
    this.productResourceService.getAllProductsUsingGET().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        this.specsResourceService
          .searchSpecsUsingGET('product.id:' + res[i].id)
          .subscribe(res2 => {
            res[i].specs = res2;
          });
      }
      this.products = res;
      this.loading = false;
    });

  }
  getDesk() {
    this.deskResourceService.getDeskUsingGET(1).subscribe(res => {
      this.orderForm.desk = res;
    });
  }

  getListByCategory(item) {
    this.productResourceService
      .searchProductsUsingGET('category.id:' + item.id)
      .subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          this.specsResourceService
            .searchSpecsUsingGET('product.id:' + res[i].id)
            .subscribe(res2 => {
              res[i].specs = res2;
            });
        }
        this.products = res;
      });
  }
  /** type 1:加,2:减 */
  changeOrderDetailsCount(item, type) {
    let exists = false;
    for (let i = 0; i < this.orderForm.orderDetails.length; i++) {
      const element = this.orderForm.orderDetails[i];
      if (element.specs.id === item.id) {
        if (type === 1) {
          this.orderForm.orderDetails[i].count += 1;
        }
        if (type === 2) {
          if (element.count > 1) {
            this.orderForm.orderDetails[i].count -= 1;
          }
          if (element.count === 1) {
            this.orderForm.orderDetails.splice(i, 1);
          }
        }
        exists = true;
      }
    }
    if (exists === false && type === 1) {
      this.orderForm.orderDetails.push({
        specs: item,
        count: 1
      });
    }
    this.sumOrder();
    console.log(this.orderForm);
  }
  sumOrder() {
    let total = 0;
    for (let i = 0; i < this.orderForm.orderDetails.length; i++) {
      const element = this.orderForm.orderDetails[i];
      total += element.specs.price * element.count;
    }
    this.orderForm.totalMoney = total;
  }
  wxPay() {
    console.log('请求微信支付');

  }
  saveOrder(type) {
    console.log(type);
    this.loading = true;
    if (this.orderForm.orderDetails.length > 0) {
      this.orderFormResourceService.createOrderFormUsingPOST(this.orderForm).subscribe((res: OrderForm) => {
        console.log(res);
        for (let i = 0; i < res.orderDetails.length; i++) {
          const element = res.orderDetails[i];
          element.orderForm = {id: res.id};
          this.orderDetailsResourceService.createOrderDetailsUsingPOST(element).subscribe(res1 => {
            console.log(res1);
          });
        }
        this.loading = false;
        this.alert = true;
        this.alertMsg = '提交成功';
        this.orderForm.orderDetails = [];
        this.orderForm.totalMoney = 0;
      });
    }
  }


}
