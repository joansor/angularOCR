import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppareilService } from '../services/appareil.service';


@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  name?: string = '';
  status?: string = '';
  id: any;
  appareil: { id: number; name: string; status: string; } | undefined;
  


  constructor(private appareilService: AppareilService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.forEach(async (params: Params) => {
          this.id = params['id'];
         
          this.appareil = await this.appareilService?.getAppareilById(+this.id);
   
          this.name = this.appareil?.name; // name
          this.status = this.appareil?.status; // status
      });
  }


}
