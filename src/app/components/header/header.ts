import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [Menubar, Menu, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  topBarItems: MenuItem[] | undefined;
  userMenuItems: MenuItem[] | undefined

  ngOnInit() {
    this.buildTopBarMenuItems();
    this.buildUserPopupMenuItems();
  }

  private buildTopBarMenuItems() {
    this.topBarItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Users',
        icon: 'pi pi-user',
        items: [
          {
            label: 'List',
            icon: 'pi pi-list'
          }
        ],
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt'
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server'
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil'
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette'
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette'
              }
            ]
          }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope'
      }
    ]
  }

  private buildUserPopupMenuItems() {
    this.userMenuItems = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: 'user/login'
      },
    ];
  }
}
