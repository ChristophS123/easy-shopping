import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackToolbarComponent } from '../components/back-toolbar/back-toolbar.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from '../home/home-routing.module';

@NgModule({
  declarations: [BackToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  exports: [BackToolbarComponent]
})
export class SharedModule { }
