import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient: HttpClient) { }

  getAllShops():Observable<any> {
    return this.httpClient.get("http://localhost:8080/api/v1/shop");
  }
}
