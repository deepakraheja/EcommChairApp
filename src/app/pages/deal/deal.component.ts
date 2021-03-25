/**
 * Deal Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
})
export class DealComponent implements OnInit {

  deals: any = [];

  constructor(private dealsService: DealsService,
    private router: Router) { }

  ngOnInit() {
    this.getDeals();
  }

  // Get list of deals
  getDeals() {
    this.deals = this.dealsService.getDeals();
  }

  // Go to cart page function
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }

}
