import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { HeaderModel, RequestModel } from '../../model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.request = {
      queries: [],
      headers: [],
      methodName: "GET",
      apiUrl: undefined
    }
  }

  @Input() isLoading: boolean;
  @Output() onRequestFinished = new EventEmitter();

  request: RequestModel;

  addHeader = () => {
    this.request.headers.push({ key: "", value: "" });
  }

  removeHeader = (header: HeaderModel) => {
    this.request.headers.splice(this.request.headers.findIndex(t => t == header), 1);
  }

  addQuery = () => {
    this.request.queries.push({ key: "", value: "" });
  }

  removeQuery = (query: HeaderModel) => {
    this.request.queries.splice(this.request.headers.findIndex(t => t == query), 1);
  }

  send = () => {
    debugger;
    if (!this.request.apiUrl)
      return;

    let queryString = '';
    this.request.queries.forEach(t => {
      queryString += (queryString ? '&' : '?') + t.key + '=' + t.value
    })
    this.request.url = this.request.apiUrl + queryString;

    let httpHeader: HttpHeaders = new HttpHeaders();
    this.request.headers.forEach(t => {
      if (t.key != '')
        httpHeader = httpHeader.set(t.key, t.value);
    })

    this.isLoading = true;
    switch (this.request.methodName) {
      case "GET":
        this.request.requestBody = null;
        this.handleObserve(this.http.get(this.request.url, { headers: httpHeader, observe: "response" }));
        break;

      case "POST":
        this.handleObserve(this.http.post(this.request.url, this.request.requestBody, { headers: httpHeader, observe: "response" }));
        break;

      case "PUT":
        this.handleObserve(this.http.put(this.request.url, this.request.requestBody, { headers: httpHeader, observe: "response" }));
        break;

      case "DELETE":
        this.request.requestBody = null;
        this.handleObserve(this.http.delete(this.request.url, { headers: httpHeader, observe: "response" }));
        break;
    }
  }

  handleObserve = (obs: Observable<any>) => {
    if (!obs)
      return;

    obs.subscribe(      
      (obj: HttpResponse<any>) => {
        debugger;
        this.onRequestFinished.next(obj);
      },
      (err: HttpErrorResponse) => {
        debugger;
        this.onRequestFinished.next(err);
      }).add(() => this.isLoading = false);
  }

  bindRequest = (request: RequestModel) => {
    this.request =
    {
      url: request.url,
      apiUrl: request.apiUrl,
      methodName: request.methodName,
      queries: [],
      headers: [],
      requestBody: request.requestBody
    }

    request.queries.forEach(t => this.request.queries.push({ key: t.key, value: t.value }));
    request.headers.forEach(t => this.request.headers.push({ key: t.key, value: t.value }));
  }
}
