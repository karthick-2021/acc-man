import { Injectable } from '@angular/core';
import { LiveBilling } from '../models/LiveBilling';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor() { }

  getInventory(): LiveBilling[] {
    return [
      new LiveBilling(1, 'Milk 500ml', 20, 24.5, 0),
      new LiveBilling(2, 'Idhayam oil 1l', 10, 268, 5),
      new LiveBilling(3, 'Tata Salt 1kg', 35, 22, 4),
      new LiveBilling(4, 'Pepper 50gm', 15, 44, 0),
      new LiveBilling(5, 'Hand Sanitizer 500 ml', 43, 88, 2),
      new LiveBilling(6, 'Gram flour 500gm', 20, 58, 5),
      new LiveBilling(7, 'Rin detergent soap 250gm', 20, 22, 10),
      // new LiveBilling(1, 'Milk 500 ml', 20, 24.5),
      // new LiveBilling(1, 'Milk 500 ml', 20, 24.5),
      // new LiveBilling(1, 'Milk 500 ml', 20, 24.5),
      // new LiveBilling(1, 'Milk 500 ml', 20, 24.5),
    ];
  }


}
