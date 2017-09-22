import {Component, Input} from '@angular/core'
import {Car} from '../car.model'
import {CarsService} from '../cars.service'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  @Input() car: Car

  constructor(private service: CarsService) {}

  onDelete() {
    this.service.deleteCar(this.car)
  }

  onBuy() {
    this.car.isSold = true
    this.service.updateCar(this.car)
  }

}
