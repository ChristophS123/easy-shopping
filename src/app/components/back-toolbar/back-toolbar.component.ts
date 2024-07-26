import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-toolbar',
  templateUrl: './back-toolbar.component.html',
  styleUrls: ['./back-toolbar.component.scss'],
})
export class BackToolbarComponent {

  @Input() backPage = '';
  @Input() title = '';
  @Input() param1:string|number|null = null;
  @Input() param2:string|number|null = null;

  constructor(private router: Router) {}

  goBack() {
    if(this.param1 == null)
      this.router.navigateByUrl(this.backPage);
    else if(this.param2 == null)
      this.router.navigate([this.backPage, this.param1]);
    else 
      this.router.navigate([this.backPage, this.param1, this.param2]);
  }

}
