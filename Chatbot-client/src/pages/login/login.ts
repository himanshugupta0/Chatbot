import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {HomePage} from '../home/home';
import {SignupPage} from '../signup/signup';
import {ForgetPasswordPage} from '../forgetpassword/forgetpassword';
import {ServicePage} from '../../services/service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  addForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

    constructor(public navCtrl: NavController, public servicePage: ServicePage, private formBuilder: FormBuilder) {}

    goTosignUp(){
        this.navCtrl.push(SignupPage);
    }

    forgetPassword(){
        this.navCtrl.push(ForgetPasswordPage);
    }

    login(){
        this.servicePage.loginData(this.addForm.value).subscribe(
            res => {
                console.log('from posted');
            },
            error => console.log(error)
        );this.navCtrl.push(HomePage);
    }


}
