import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirefunctionsService {

  private apiUrl: string = "https://us-central1-picknwash-56236.cloudfunctions.net";

  constructor(private http: HttpClient) { }

  public getDate(){
    return this.http.get(this.apiUrl+'/getDate');
  }
}
