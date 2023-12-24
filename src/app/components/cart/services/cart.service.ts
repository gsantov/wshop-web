import { Injectable } from '@angular/core';
import { ShopProductModel } from '../../../models/shopProduct.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  _cartItems: Array<ShopProductModel> = [];
  testStr:string = '';

  constructor() { }

  addProduct(product:ShopProductModel){
    let foundItem = this._cartItems.find(prod => prod.id == product.id);
    if(foundItem){
      // sumo 
      foundItem.quantity = foundItem.quantity! + product.quantity!;
    } else {
      this._cartItems.push(Object.assign({}, product));
    }

    // setTimeout(()=>{
    //   console.log("this.cartItems", this.cartItems);
    // }, 500)
  }

  isEmpty(){
    return this._cartItems.length == 0;
  }

  cartSize(){
    return this._cartItems.length;
  }


}
