import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {

  currentUser:User = new User;

  listName:string = "";

  constructor(private toastController:ToastController, private authService:AuthService, private router:Router, private listService:ListService) { }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    })
    toast.present();
  }

  async ngOnInit() {
    let nUser = await this.authService.getCurrentUser();
    if(nUser == null) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = nUser;
  }

  async createList() {
    if(this.listName == "") {
      await this.presentToast("Gebe einen Namen für die Liste ein.");
      return;
    }
    this.listService.createList(this.currentUser.id, this.listName);
    this.router.navigate(['home']);
  }

}
