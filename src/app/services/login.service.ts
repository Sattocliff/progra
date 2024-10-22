import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public urlApi: string = "http://localhost:5000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  constructor(
    private http: HttpClient
  ) { }

  public login(data: any): Observable<any> {
    const url: string = this.urlApi + "/login";
    return this.http.post<any>(url, data); 
  }

  public registro(data: any): Observable<any> {
    const url: string = this.urlApi + "/registro";
    return this.http.post<any>(url, data); 
  }
}
