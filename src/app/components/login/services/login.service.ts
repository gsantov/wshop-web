import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;
  nextRoute?:Route;

  constructor(private router: Router, private httpClient: HttpClient) { }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  login(userName:string, password:string):Promise<any>{
    // console.log("nextRoute", this.nextRoute);

    return this.httpClient.post("http://localhost:8080/api/v1/login", 
      {userName: userName, password: password}).toPromise();
    
    
    // this.isLoggedIn = true;    
    // this.router.navigate([this.nextRoute!.path]);
  }

  logout(){
    this.isLoggedIn = true;
  }




  getAllClients():Observable<any> {
    return this.httpClient.get("http://localhost:8080/api/v1/client");
  }

}
