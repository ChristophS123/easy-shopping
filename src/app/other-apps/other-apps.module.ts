import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherAppsPageRoutingModule } from './other-apps-routing.module';

import { OtherAppsPage } from './other-apps.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherAppsPageRoutingModule,
    SharedModule
  ],
  declarations: [OtherAppsPage]
})
export class OtherAppsPageModule {}
