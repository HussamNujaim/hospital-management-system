import { Component, Input } from '@angular/core';
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";

@Component({
  selector: 'mx-button',
  template: `
    <button ejs-button>{{ label }}</button>`,
  styleUrls: ['./mx-button.component.scss'],
  imports: [
    ButtonModule
  ]
})
export class MxButtonComponent {
  @Input() label = 'Button';
}
