import { ChangeDetectionStrategy, Component, OnInit, signal, inject, computed } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { APP_ROUTES } from '../../../shared/config/routes.config';
import { AuthService } from '../../../domains/auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  imports: [Menubar, Menu, ButtonModule, RouterModule, AvatarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginRoute = APP_ROUTES.auth.login;
  protected readonly topBarItems = signal<MenuItem[]>([]);
  protected readonly isAuthenticated = toSignal(this.authService.isAuthenticated$);
  protected readonly session = toSignal(this.authService.session$);
  protected readonly username = computed(() => this.session()?.username ?? '???');
  protected readonly userRole = signal<string>('Rank');
  protected readonly userMenuItems = computed<MenuItem[]>(() => {
    if (!this.isAuthenticated()) {
      return [];
    }

    return [
      {
        label: 'Edit profile',
        icon: 'pi pi-user-edit'
      },
      {
        label: 'Preferences',
        icon: 'pi pi-cog'
      },
      {
        separator: true
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => this.onLogout()
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
