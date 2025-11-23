import { Component, Input } from '@angular/core';

@Component({
  selector: 'mx-button',
  template: `<button ejs-button [isPrimary]="isPrimary">{{ label }}</button>`,
  styleUrls: ['./mx-button.component.scss'],
})
export class MxButtonComponent {
  @Input() label = 'Button';
  @Input() isPrimary = false;
}
