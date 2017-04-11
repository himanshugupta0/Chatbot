import { Component,NgZone } from '@angular/core';
import { NavController,ViewController,NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import io from 'socket.io-client';
import {ServiceDetailPage} from '../service-page/service-page';
import {ServicePage} from '../../services/service';

@Component({
  selector: 'page-chatpage',
  templateUrl: 'chatpage.html'
})


export class ChatPage {

    first : String;
    cardName : String;
    cardImage : String;
    cardDetails:Array<Object>;
    chatinp: String;
    uname : Array<Object>;
    gridHidden: boolean;
    whenHide : boolean;

    sendMsgForm = new FormGroup({
    msg: new FormControl('', Validators.required)
  });

constructor(
            public navCtrl: NavController,
            public viewCtrl: ViewController,
            public navParams: NavParams,
            public zone: NgZone,
            public servicePage: ServicePage,
            private formBuilder: FormBuilder
        ) {

    this.uname = [];
    this.gridHidden = false;
    this.whenHide = true;
    // this.first = servicePage.username.charAt(0);
    // this.first = this.first.toUpperCase();
    this.cardDetails= [
        {
            name : "Tenant Manegment",
            image : "img/tenant.png"
        },
        {
            name : "Property Watch",
            image : "img/property.png"

        },
        {
            name : "Sell/Buy Property",
            image : "img/buysell.png"

        },
        {
            name : "Assisting Elders",
            image : "img/elders.png"
        },
        {
            name : "Bill Payments",
            image : "img/bill.png"
        },
        {
            name : "Concierge Services",
            image : "img/concierge.png"
        },
        {
            name : "Documents Procurement",
            image : "img/document.png"
        },
        {
            name : "Photobook Delivery",
            image : "img/photobook.png"
        },
        {
            name : "Startup Helping Hand",
            image : "img/helpinghand.png"
        }
    ]

    servicePage.socket = io("http://10.0.0.16:3000");
      

        servicePage.socket.on('service page', (msg) => {
            this.zone.run(() => {
                this.uname.push({'username' : 'MunshiJi', 'chat': 'You select '+this.cardName+' service. Please give the following details to create service.', 'reply_no': msg.reply_no});
                this.uname.push({'username' : 'MunshiJi', 'chat': msg.msg, 'reply_no': msg.reply_no});
                this.whenHide = false;
                this.gridHidden = true;
            });
        });

        servicePage.socket.on('user detail', (msg) => {
            this.zone.run(() => {
                this.uname.push({'username' : 'MunshiJi', 'chat': msg.msg});
                // if(msg.msg == 'Thanks for creating a service. Our executive will connect to you shortly.') {
                //     this.ionViewDidLeave();
                // }
            });
        });
  }

    send(msg) {
        if(msg != ''){
            this.uname.push({'username': this.servicePage.username, 'chat': msg});
            this.servicePage.socket.emit('user detail', {username: this.servicePage.username, msg});
        }
        this.chatinp = '';
    }

    selectCard(card) {
        this.cardName = card.name;
        this.cardImage = card.image;
        this.navCtrl.push(ServiceDetailPage, {cardname:this.cardName, cardimg: this.cardImage});
        this.gridHidden = false;
    }

    ionViewDidLoad() {
        this.servicePage.socket.emit('username', this.servicePage.username);
    }

    // ionViewDidLeave(){
    //     if(this.servicePage.temp != true){
    //         this.servicePage.socket.emit('end', this.servicePage.username);
    //         console.log('disconnect');
    //     }
    // }

}
