import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import {ServicePage} from '../../services/service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repass: new FormControl('', Validators.required),
    refferalId: new FormControl('', Validators.required),
    refferalCode: new FormControl('', Validators.required),
  });

  constructor(public navCtrl: NavController, public servicePage: ServicePage, private formBuilder: FormBuilder) {}

  setname(nickname) {
    this.servicePage.username = nickname;
    this.servicePage.temp = false;
        if(this.servicePage.username != null){
          this.navCtrl.push(HomePage);
        }
    }

    GoToLogin(){
      this.navCtrl.push(LoginPage);
    }

    signUp(){
      console.log(this.addForm.value);
      this.servicePage.signUpData(this.addForm.value).subscribe(
        res => {
          console.log('Signup data posted');
          this.navCtrl.push(HomePage);
        },
        error => console.log(error)
      );
      // this.navCtrl.push(HomePage);
    }

}
