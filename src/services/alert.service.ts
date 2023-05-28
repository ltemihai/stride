import { Injectable } from '@angular/core';
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private readonly alertService: TuiAlertService) { }

  success(message: string) {
    this.alertService.open(message, {
      status: TuiNotification.Success
    }).pipe(take(1)).subscribe()
  }

  error(message: string) {
    this.alertService.open(message, {
      status: TuiNotification.Error
    }).pipe(take(1)).subscribe()
  }
}
