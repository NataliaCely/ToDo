import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendInfoService {
  public refreshListTask: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
}
