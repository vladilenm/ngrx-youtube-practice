import {Injectable} from '@angular/core'
import {Actions, Effect} from '@ngrx/effects'
import {AddCar, CAR_ACTION} from './cars.action'
import {Car} from '../car.model'
import {CarsService} from '../cars.service'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'

@Injectable()
export class CarsEffect {

  constructor(private actions$: Actions, private service: CarsService) {}

  @Effect() loadCars = this.actions$.ofType(CAR_ACTION.ADD_CAR)
    .switchMap((action: AddCar) => {
      return this.service.preloadCars()
    })
    .mergeMap((cars: Car[]) => {
      return [
        {
          type: CAR_ACTION.LOAD_CARS,
          payload: cars
        }
      ]
    })

}
