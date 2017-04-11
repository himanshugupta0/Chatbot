import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
@Injectable()
export class ServicePage {
  public socket: any; 
  public username: String;
  public temp: boolean;

  constructor(private http: Http) {}

  private appUrl = 'http://localhost:3000/signup';

  // getLoginData(): Observable<any>{

  // }

  // getSignUpData(): Observable<any>{
    
  // }

  loginData(data): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post('http://localhost:3000/login', JSON.stringify(data));
  }

  signUpData(data): Observable<any>{
    console.log(JSON.stringify(data));
    return this.http.post(this.appUrl, data);
  }

}
