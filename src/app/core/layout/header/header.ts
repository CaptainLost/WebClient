import { ChangeDetectionStrategy, Component, OnInit, signal, inject, computed } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { APP_ROUTES } from '../../../shared/config/routes.config';
import { AuthService } from '../../../domains/auth/services/auth.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [Menubar, Menu, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  protected readonly topBarItems = signal<MenuItem[]>([]);
  protected readonly isAuthenticated = toSignal(this.authService.isAuthenticated$);
  protected readonly userMenuItems = computed<MenuItem[]>(() => {
    return this.isAuthenticated() ? [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.onLogout()
      }
    ] : [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: APP_ROUTES.auth.login
      }
    ];
  });

  ngOnInit(): void {
    this.buildTopBarMenuItems();
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

  private onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate([APP_ROUTES.auth.login]);
      }
    });
  }
}
