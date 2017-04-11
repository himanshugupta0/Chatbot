import { Component } from '@angular/core';
import { NavController,NavParams  } from 'ionic-angular';
import {ServicePage} from '../../services/service';


@Component({
  selector: 'page-service-page',
  templateUrl: 'service-page.html'
})
export class ServiceDetailPage {

  card: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicePage: ServicePage) {

    servicePage.temp = true;
    this.card = {
      name:'',
      image:''
    };

    this.card.name = this.navParams.get('cardname');
    this.card.image = this.navParams.get('cardimg');
  }

  createService(){
    this.servicePage.socket.emit('service page',this.card);
    this.navCtrl.pop(ServiceDetailPage);
  }


}
