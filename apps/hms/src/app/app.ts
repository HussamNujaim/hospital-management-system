import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MxLayoutComponent } from '@shared/layout';

@Component({
  imports: [MxLayoutComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'MedsoftX | Hospital Management System';
}
