import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AppareilService {

  appareilsSubject = new Subject<any[]>();
  //private appareils = [];
  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  constructor(private httpClient: HttpClient) { }

  getAppareilById(id: number) {
    console.log(id);
    const appareil = this.appareils?.find(
      (objetAppareil) => {
        return objetAppareil.id === id;
      }
    );
    return appareil;
  }
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
      this.emitAppareilSubject();
    }
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
  saveAppareilsToServer() {
    //la méthode  post() , qui permet de lancer un appel POST, prend comme premier argument l'URL visée, et comme deuxième argument le corps de l'appel, c'est-à-dire ce qu'il faut envoyer à l'URL ;l'extension  .json  de l'URL est une spécificité Firebase, pour lui dire que vous lui envoyez des données au format JSON ;la méthode  post()  retourne un Observable — elle ne fait pas d'appel à elle toute seule.  C'est en y souscrivant que l'appel est lancé ;dans la méthode  subscribe() , vous prévoyez le cas où tout fonctionne et le cas où le serveur vous renverrait une erreur.

    this.httpClient
      .put('https://http-client-demo-80c55-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
      .subscribe(
        {
          next() {
            console.log('Enregistrement terminé !');
          },
          error(error) {
            console.log('Erreur ! : ' + error);
          }
        }
      );
  }
  getAppareilsFromServer() {
    return this.httpClient.get('https://http-client-demo-80c55-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
  }
}