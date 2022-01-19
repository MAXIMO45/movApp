import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {map, tap, switchMap,filter, take} from 'rxjs/operators';

const TOKEN_KEY = 'my-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated:  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken(){
    const token = await Storage.get({key: TOKEN_KEY});
    if (token && token.value) {
      console.log('token: ',token.value);
      this.token = token.value; //save token?
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
    }
  }
  isLogged(): Observable<boolean> {
    return this.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  login(credentials: {email; password}): Observable<any>{
    return this.http.post(`https://reqres.in/api/login`,credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => from(Storage.set({key: TOKEN_KEY, value: token}))),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
