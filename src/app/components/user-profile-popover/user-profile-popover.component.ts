import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile-popover',
  templateUrl: './user-profile-popover.component.html',
  styleUrls: ['./user-profile-popover.component.scss'],
})
export class UserProfilePopoverComponent {

  @Input() userName: string = "No Account";
  @Input() profileImage:string = "";
  @Input() token:string = "";

  constructor(private popoverController: PopoverController, private router:Router, private authService:AuthService) { }

  manageAccount() {
    this.popoverController.dismiss();
    
  }

  signOut() {
    this.popoverController.dismiss();
    this.authService.signOut();
    this.router.navigate(['/login'])
  }

}
