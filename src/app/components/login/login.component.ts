import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { CartService } from '../cart/services/cart.service';
import { LoginService } from './services/login.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginService:LoginService, private cartService:CartService,
    private router: Router){
    console.log("cartService", cartService._cartItems);
    
  }

  async doLogin(){
    if(!this.loginForm.valid){
      return;
    }
    this.loginService.isLoggedIn = await this.loginService
      .login(this.loginForm.value.userName!, this.loginForm.value.password!)
      console.log("this.loginService.isLoggedIn", this.loginService.isLoggedIn);
      
      if(this.loginService.isLoggedIn) {
        this.router.navigate(['/cart']);
      } else {
        // Show error
      }
  }

  validateFormField(field:string) {
    return this.loginForm.get(field)?.errors && 
      (this.loginForm.get(field)?.dirty || this.loginForm.get(field)?.touched)
  }

}
