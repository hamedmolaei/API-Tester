import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ResponseModel } from './model';
import { HistoryComponent } from './components/history/history.component';
import { RequestComponent } from './components/request/request.component';
import { ResponseComponent } from './components/response/response.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.isLoading = false;
  }

  @ViewChild(RequestComponent, { static: true }) requestComp: RequestComponent;
  @ViewChild(HistoryComponent, { static: true }) historyComp: HistoryComponent;
  @ViewChild(ResponseComponent, { static: true }) responseComp: ResponseComponent;
  isLoading: boolean;

  bindResponse = (res: HttpResponse<any> | HttpErrorResponse) => {
    debugger;
    this.responseComp.bindResponse(this.requestComp.request, res);
    this.responseComp.showResponse();

    this.historyComp.addHistory(this.responseComp.response);
  }

  bindHistory = (history: ResponseModel) => {
    debugger;
    this.requestComp.bindRequest(history.request);
    this.responseComp.response = history;
  }
}
