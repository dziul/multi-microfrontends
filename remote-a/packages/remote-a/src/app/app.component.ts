import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private router: Router){

    console.log('>>> AppComponent.constructor')
  }

  ngOnInit(): void {
    this.router.initialNavigation() // necessário iniciar navegação manualmente

    // this.router.navigateByUrl('/home')
  }
}
