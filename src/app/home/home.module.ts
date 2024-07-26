import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserProfilePopoverComponent } from '../components/user-profile-popover/user-profile-popover.component';
import { ListListItemComponent } from '../components/list-list-item/list-list-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage, UserProfilePopoverComponent, ListListItemComponent]
})
export class HomePageModule {}
