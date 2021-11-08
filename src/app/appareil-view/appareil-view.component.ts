import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;
  lastUpdate = new Promise<Date>((resolve, reject) => {
    const date: Date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });
  appareils: any[] | undefined;
  appareilSubscription?: Subscription;

  constructor(private appareilService?: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit(): void {
    this.appareilSubscription = this.appareilService?.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService?.emitAppareilSubject();
  }
  onAllumer(): void {
    this.appareilService?.switchOnAll();
  }
  onEteindre(){
    if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService?.switchOffAll();
    }
  }
  ngOnDestroy() {
    this.appareilSubscription?.unsubscribe();
  }
}
