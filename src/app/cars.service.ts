import {Injectable} from '@angular/core'
import {Http, Response} from '@angular/http'
import {Store} from '@ngrx/store'
import {AppState} from './redux/app.state'
import {AddCar, DeleteCar, LoadCars, UpdateCar} from './redux/cars.action'
import {Observable} from 'rxjs/Observable'
import {Car} from './car.model'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class CarsService {

  static BASE_URL: string = 'http://localhost:3000/'

  constructor(private http: Http, private store: Store<AppState>) {}

  preloadCars(): Observable<Car[]> {
    return this.http.get(CarsService.BASE_URL + 'cars')
      .map((response: Response) => response.json())
  }

  loadCars(): void {
    this.preloadCars()
      .toPromise()
      .then((cars: Car[]) => {
        this.store.dispatch(new LoadCars(cars))
      })
  }

  addCar(car: Car) {
    this.http.post(CarsService.BASE_URL + 'cars', car)
      .map((response: Response) => response.json())
      .toPromise()
      .then((car: Car) => {
        this.store.dispatch(new AddCar(car))
      })
  }

  deleteCar(car: Car) {
    this.http.delete(CarsService.BASE_URL + 'cars/' + car.id)
      .map((response: Response) => response.json())
      .toPromise()
      .then(_ => {
        this.store.dispatch(new DeleteCar(car))
      })
  }

  updateCar(car: Car) {
    this.http.put(CarsService.BASE_URL + 'cars/' + car.id, car)
      .map((response: Response) => response.json())
      .toPromise()
      .then((car: Car) => {
        this.store.dispatch(new UpdateCar(car))
      })
  }
}
