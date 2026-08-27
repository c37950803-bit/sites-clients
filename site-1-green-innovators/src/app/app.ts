import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CartDrawerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
