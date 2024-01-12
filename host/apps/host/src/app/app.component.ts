import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'host-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  protected version = VERSION.full

  title = 'host';
}
