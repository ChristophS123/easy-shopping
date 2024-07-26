import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { LoadingController, PopoverController } from '@ionic/angular';
import { UserProfilePopoverComponent } from '../components/user-profile-popover/user-profile-popover.component';
import { ListService } from '../services/list.service';
import { ShoppingList } from '../models/ShoppingList';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loading:boolean = false;

  currentUser:User = new User;
  currentProfileImage:string = "";
  shoppingLists:ShoppingList[] = []

  constructor(private loadingController: LoadingController, private router:Router, private listService:ListService, private authService:AuthService, private popoverController:PopoverController) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Bitte Warten...',
      spinner: 'crescent', // Weitere Optionen: 'bubbles', 'circles', 'lines'
    });
    await loading.present();
    let pUser:User|null = await this.authService.getCurrentUser();
    if(pUser == null) {
      this.router.navigate(["/login"]);
      return;
    }
    this.currentUser = pUser;
    this.currentProfileImage = await this.authService.getProfileImageFromUser(this.currentUser.id);
    this.shoppingLists = await this.listService.loadListsFromUser(this.currentUser.id);
    loading.dismiss();
  }

  async signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  navigateToPage(page:string) {
    this.router.navigate([page]);
  }

  async presentPopover(event:any) {
    const popover = await this.popoverController.create({
      component: UserProfilePopoverComponent,
      event: event,
      translucent: true,
      componentProps: {
        userName: this.currentUser.name,
        profileImage: this.currentProfileImage,
        token: await this.authService.getUserToken()
      }
    });
    await popover.present();
  }

}
