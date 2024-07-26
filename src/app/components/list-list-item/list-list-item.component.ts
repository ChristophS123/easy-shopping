import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingList } from 'src/app/models/ShoppingList';

@Component({
  selector: 'app-list-list-item',
  templateUrl: './list-list-item.component.html',
  styleUrls: ['./list-list-item.component.scss'],
})
export class ListListItemComponent {

  @Input() currentList:ShoppingList = new ShoppingList;

  constructor(private router:Router) {  }

  gotToListDetail() {
    this.router.navigate(['shopping-list', this.currentList.id]);
  }

}
