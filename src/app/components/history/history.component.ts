import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ResponseModel } from '../../model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private coockies: CookieService) { }

  ngOnInit() {
    this.cookieKey = "apiTestHistories";
    this.histories = [];
    this.getHistories();
  }

  @Output() onHistoryClick = new EventEmitter();
  histories: ResponseModel[];
  cookieKey: string;

  clearHistory = () => {
    debugger;
    this.histories = [];
    this.updateCookie();
  }

  addHistory = (history: ResponseModel) => {
    debugger;
    let temp: ResponseModel = {
      request: {
        apiUrl: history.request.apiUrl,
        methodName: history.request.methodName,
        queries: [],
        headers: [],
        requestBody: history.request.requestBody
      },
      original: history.original,
    }

    history.request.queries.forEach(t => temp.request.queries.push({ key: t.key, value: t.value }));
    history.request.headers.forEach(t => temp.request.headers.push({ key: t.key, value: t.value }));
    this.histories.push(temp);
    this.updateCookie();
  }

  RemoveHistory = (history: ResponseModel) => {
    debugger;
    this.histories.splice(this.histories.findIndex(t => t == history), 1);
    this.updateCookie();
  }

  bindHistory = (history: ResponseModel) => {
    this.onHistoryClick.next(history);
  }

  getHistories = () => {
    debugger;
    var x = this.coockies.getAll();
    let jhistories = this.coockies.get(this.cookieKey);
    if (jhistories)
      this.histories = JSON.parse(jhistories);
  }

  updateCookie = () => {
    this.coockies.set(this.cookieKey, JSON.stringify(this.histories));
  }
}
