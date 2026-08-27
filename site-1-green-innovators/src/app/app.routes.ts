import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BoutiqueComponent } from './pages/boutique/boutique';
import { ServicesComponent } from './pages/services/services';
import { FinancementComponent } from './pages/financement/financement';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'boutique', component: BoutiqueComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'financement', component: FinancementComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
