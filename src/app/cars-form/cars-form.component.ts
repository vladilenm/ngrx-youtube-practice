import {Component} from '@angular/core'
import * as moment from 'moment'
import {Car} from '../car.model'
import {CarsService} from '../cars.service'

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.css']
})
export class CarsFormComponent {

  carName: string = ''
  carModel: string = ''

  constructor(private service: CarsService) {
  }

  onAdd() {
    if (this.carModel === '' || this.carName === '') return

    const date = moment().format('DD.MM.YY')
    const car = new Car(this.carName, date, this.carModel)

    this.service.addCar(car)

    this.carModel = ''
    this.carName = ''
  }

  onLoad() {
    this.service.loadCars()
  }

}
