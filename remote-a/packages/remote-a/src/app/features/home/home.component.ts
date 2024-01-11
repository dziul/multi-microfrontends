import { Component } from '@angular/core';
import { loadRemoteModule } from '../../shared/route.util';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    constructor() {
        console.log('>>>HomeComponent.constructor')


        loadRemoteModule({
            remoteEntry: 'http://localhost:4201/remoteEntry.mjsx',
            exposedModule: './Module',
        }).then(console.log)
    }
}