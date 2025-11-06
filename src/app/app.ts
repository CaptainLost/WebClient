import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/layout/header/header";
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from "./core/layout/spinner/spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastModule, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly title = signal('WebClient');
}
