import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ForgetPasswordPage } from '../pages/forgetpassword/forgetpassword';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chatpage/chatpage';
import { ServiceDetailPage } from '../pages/service-page/service-page';
import { ServicePage } from '../services/service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ForgetPasswordPage,
    HomePage,
    ChatPage,
    ServiceDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    ForgetPasswordPage,
    HomePage,
    ChatPage,
    ServiceDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},ServicePage]
})
export class AppModule {}
