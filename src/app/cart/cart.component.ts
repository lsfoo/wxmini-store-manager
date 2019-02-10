import { OrderForm } from './../../../shared/model/orderForm';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input()
  orderForm: OrderForm;

  @Output()
  hide_emitter = new EventEmitter();
  @Output()
  pay_in_cash_emitter = new EventEmitter();
  @Output()
  pay_in_wx_emitter = new EventEmitter();

  constructor() { }

  ngOnInit() { }
  payInWx() {
    this.pay_in_wx_emitter.emit();
    this.closeModal();
  }
  payInCash() {
    this.pay_in_cash_emitter.emit();
    this.closeModal();
  }

  closeModal() {
    this.hide_emitter.emit(this.orderForm.orderDetails);
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
  clearCart() {
    this.orderForm.orderDetails = [];
    this.closeModal();
  }
}
