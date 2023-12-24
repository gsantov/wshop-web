import { Component, OnInit } from '@angular/core';
import { ShopService } from './services/shop.service';
import { lastValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { ShopModel } from '../../models/shop.model';
import { ShopProductModel } from '../../models/shopProduct.model';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { CartService } from '../cart/services/cart.service';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatGridListModule, MatTableModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  shopList?:Array<ShopModel>;
  cols:number = 4;
  shopProductList: Array<ShopProductModel> = [];
  displayedColumns: string[] = ['name', 'cost', 'actions'];


  constructor(private shopService:ShopService, private cartService:CartService){

  }

  async ngOnInit() {
    let request = await lastValueFrom(this.shopService.getAllShops());
    console.log("request", request);
    
    if(request.data){
      this.shopList = request.data;
      if(this.shopList!.length < 4){
        this.cols = this.shopList!.length
      }
    } else {
      console.log(request.data.message);
    }
  }

  showShopProducts(shopId:number){
    this.shopProductList = this.shopList!.find(shop => shop.id === shopId)!.productsList!;
    // this.shopProductList.forEach(product => product.quantity = 0)
  }
  
  addProduct(product:ShopProductModel){
    console.log("product", product);
    
    if(product.quantity == undefined || product.quantity === 0){
      // show alert
    } else {
      this.cartService.addProduct(product);  
    }
    product.quantity = undefined;
    
    
  }

}
