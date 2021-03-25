/**
 * Home Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() themeLogo: string = 'assets/images/icon/logo-a.png'; // Default Logo
  constructor(private router: Router) { }

  ngOnInit() { }

  // Go to cart page
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }

}
