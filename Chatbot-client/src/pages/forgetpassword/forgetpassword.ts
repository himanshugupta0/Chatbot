import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {LoginPage} from '../login/login';
import {ServicePage} from '../../services/service';

@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html'
})
export class ForgetPasswordPage {

  addForm = new FormGroup({
    email: new FormControl('', Validators.required)
  });

    constructor(public navCtrl: NavController, public servicePage: ServicePage, private formBuilder: FormBuilder) {}

    forgetPassword(){

    }

    cancel(){
        this.navCtrl.push(LoginPage);
    }

}
