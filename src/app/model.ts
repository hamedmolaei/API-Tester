import { HttpResponseBase } from '@angular/common/http';

export interface HeaderModel {
  key: string;
  value: string;
}

export interface RequestModel {
  methodName: string;
  apiUrl: string;
  queries?: HeaderModel[];
  headers?: HeaderModel[];
  requestBody?: string;
  url?: string;
}

export interface ResponseModel {
  original: HttpResponseBase;
  request: RequestModel;
}
