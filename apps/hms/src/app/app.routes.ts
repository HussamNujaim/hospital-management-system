import { Route } from '@angular/router';
import { MainPageComponent } from './pages/main-page.component';
import { AboutPageComponent } from './pages/about-page.component';
import { SettingsPageComponent } from './pages/settings-page.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'settings', component: SettingsPageComponent },
];
