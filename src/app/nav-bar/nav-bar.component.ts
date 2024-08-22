import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [TabMenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/home',
        routerLinkActiveOptions: this.activeItem,
      },
    ];
    this.activeItem = this.items[0];
  }
}
