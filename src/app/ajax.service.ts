import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
	news=null;
  constructor( public http:HttpClient) { 
  	this.http.get('https://newsapi.org/v2/top-headlines?country=gb&apiKey=c29490f601b54caaa14a069974e9a927').subscribe(
      resultado =>{
        this.news=resultado; 
      }
    );
  }
}
