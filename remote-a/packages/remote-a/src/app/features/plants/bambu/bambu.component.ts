import { Component } from '@angular/core';


@Component({
    selector: 'app-bambu',
    template: `<p>bambu Yes!</p>  <button (click)="goBack()">back</button>`,
    styleUrls: ['./bambu.component.css'],
})
export class BambuComponent { 

    goBack(){
        window.history.back()
    }
}
