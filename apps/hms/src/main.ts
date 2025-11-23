import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLicense } from '@syncfusion/ej2-base';

// Register the Syncfusion license key from environment variables
const licenseKey = (import.meta as any).env['VITE_SYNCFUSION_LICENSE_KEY'];
if (licenseKey) {
  registerLicense(licenseKey);
} else {
  console.warn('Syncfusion license key not found in environment variables.');
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
