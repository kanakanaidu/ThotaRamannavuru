import { Component, OnInit, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '../app.module';
import { environment } from 'src/environments/environment';


if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
});

@Component({
  selector: 'app-list-memberes',
  templateUrl: './list-memberes.component.html',
  styleUrls: ['./list-memberes.component.css']
})
export class ListMemberesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
