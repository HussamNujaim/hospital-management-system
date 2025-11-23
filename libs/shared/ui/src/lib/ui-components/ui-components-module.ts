import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Syncfusion Modules
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';

// Wrapper Component
import { MxButtonComponent } from '../mx-button/mx-button.component';

@NgModule({
  imports: [CommonModule, ButtonModule, GridModule, MxButtonComponent],
  declarations: [],
  exports: [
    // Export wrapper component for use in your apps
    MxButtonComponent,
    // You can also re-export the Syncfusion modules if needed internally by other UI lib components
    //ButtonModule,
    //GridModule,
  ],
})
export class UiComponentsModule {}
