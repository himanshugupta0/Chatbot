import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatPage} from '../chatpage/chatpage';
import {ServicePage} from '../../services/service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public servicePage: ServicePage) {
    servicePage.temp = false;
  }

  createService() {
    this.navCtrl.push(ChatPage);
  }

}
