/**
 * Filter Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  priceRange: any;
  colors: any = ["#CECE45", "#F951E2", "#CF0114"];
  sizes: any = ["S", "M", "L", "XL"];
  brands: any = ["Gucci", "Chanel", "Louis Vuitton", "Hermès", "Nike", "Prada"];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.configure();
  }

  configure() {
    this.priceRange = {
      lower: 30,
      upper: 60
    }
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
