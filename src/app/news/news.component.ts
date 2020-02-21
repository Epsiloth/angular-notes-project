import { Component,Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AjaxService} from '../ajax.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news;

  constructor(private breakpointObserver: BreakpointObserver,public http:HttpClient, public serv:AjaxService) 
  { 

  }

  ajax(){
	this.news = this.serv.news.articles;
  }

  ngOnInit(): void 
  {
    this.ajax();
    setInterval(function(){this.ajax()}, 600000);
  }

}
