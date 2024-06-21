import { Component, effect, inject } from '@angular/core';
import { LoadService } from '../../services/load/load.service';

@Component({
  selector: 'app-load',
  standalone: true,
  imports: [],
  templateUrl: './load.component.html',
  styleUrl: './load.component.sass'
})
export class LoadComponent {
public _serLoad = inject(LoadService)
public isLoad: boolean = false;
constructor(){
  effect(()=>{
    this.isLoad = this._serLoad.isLoadingSignal();
  })
}

}
