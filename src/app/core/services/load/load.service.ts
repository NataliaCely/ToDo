import { Injectable, signal } from '@angular/core';
import { Signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoadService {
  public isLoadingSignal = signal<boolean>(false);
  constructor() {}

  show(): void {
    this.isLoadingSignal.set(true);
  }

  hide(): void {
    this.isLoadingSignal.set(false);
  }
}
