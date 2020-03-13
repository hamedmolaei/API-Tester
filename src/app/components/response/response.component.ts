import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ResponseModel, RequestModel } from '../../model';

declare var $: any;

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  response: ResponseModel;
  responseContent: string;

  showResponse = () => {
    $("#respose-modal").modal('show');
  }

  bindResponse = (req: RequestModel, res: HttpResponse<any> | HttpErrorResponse) => {
    debugger;
    var response: ResponseModel = {
      request: req,
      original: res
    };

    this.response = response;

    $('#tab-response-body').tab('show');
    this.setResponseContent('ResponseBody');
  }

  setResponseContent = (tabName: string) => {
    this.responseContent = '';
    switch (tabName) {
      case 'RequestHeaders':
        this.response.request.headers.forEach(t => {
          if (t.key != '')
            this.responseContent += t.key + ' : ' + t.value + '\n';
        });
        this.responseContent = this.responseContent ? this.responseContent : 'No headers...';
        break;
      case 'ResponseHeaders':
        this.response.original.headers.keys().forEach(t => {
          this.responseContent += t + ' : ' + this.response.original.headers.get(t) + '\n';
        });
        this.responseContent = this.responseContent ? this.responseContent : 'No headers...';
        break;
      case 'ResponseBody':
        if (this.response.original instanceof HttpResponse) {
          this.responseContent = JSON.stringify(this.response.original.body, null, 3);
        }
        if (this.response.original instanceof HttpErrorResponse) {
          this.responseContent = this.response.original.name + "\n" + this.response.original.message;
          this.responseContent += this.response.original.error ? "\n" + 'error: ' + JSON.stringify(this.response.original.error, null, 1) : '';
        }
        this.responseContent = this.responseContent ? this.responseContent : 'No contents...';
        break;
    }
  }
}
