import { Component, OnInit } from '@angular/core';
import {Observable, interval} from 'rxjs';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  secondes: number | undefined;

  ngOnInit() {
    const counter = interval(1000).subscribe(
      (value: any) => {
        this.secondes = value;
      },
      (error: any) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  }
}
