import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email:string = "";
  password:string = "";

  constructor(private toastController:ToastController, private router:Router, private authService:AuthService) { }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    })
    toast.present();
  }

  async login() {
    if(this.email == "" || this.password == "") {
      this.presentToast("Bitte fülle alle Felder aus.");
      return;
    }
    let res:boolean = await this.authService.signIn(this.email, this.password);
    if(!res) {
      this.presentToast("Email oder Passwort falsch.")
      return;
    }
    this.router.navigate(["/home"]);
  }

}
