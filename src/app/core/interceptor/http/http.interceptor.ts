import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadService } from '../../services/load/load.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const _serLoad = inject(LoadService);
  _serLoad.show();
  req = req.clone({
    setHeaders:{
      'Content-Type': 'application/json'
    }
  })
  return next(req).pipe(finalize(()=> _serLoad.hide()));
};
