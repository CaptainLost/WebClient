import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { APP_ROUTES } from '../../../shared/config/routes.config';

@Component({
  selector: 'app-header',
  imports: [Menubar, Menu, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  protected readonly topBarItems = signal<MenuItem[]>([]);
  protected readonly userMenuItems = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.buildTopBarMenuItems();
    this.buildUserPopupMenuItems();
  }

  private buildTopBarMenuItems(): void {
    this.topBarItems.set([
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: APP_ROUTES.home
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
    ]);
  }

  private buildUserPopupMenuItems(): void {
    this.userMenuItems.set([
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: APP_ROUTES.auth.login
      },
    ]);
  }
}
