/**
 * Home Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Service/Products.service';
import { Productkart } from 'src/app/shared/classes/productkart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() themeLogo: string = 'assets/images/icon/logo-a.png'; // Default Logo

  public productskartBestSeller: Productkart[] = [];
  public productskartNewProduct: Productkart[] = [];
  public productskartOnSale: Productkart[] = [];
  public user: any[] = JSON.parse(localStorage.getItem('LoggedInUser'));
  constructor(private router: Router,
    private _prodService: ProductsService,) {
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (this.user == null || this.user == undefined) {
      this.router.navigate(['/tabs/SelectionBuyer']);
    }
  }

  ngOnInit() {
    debugger
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (this.user == null || this.user == undefined) {
      this.router.navigate(['/tabs/SelectionBuyer']);
    }
    else
      this.BindProductByCategory();
  }

  // Go to cart page
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }

  //Added on 08/07/2020
  BindProductByCategory() {
    debugger
    let productObj = {
      Active: true,
      Subcatecode: ''
    }
    //this.spinner.show();
    this._prodService.GetBestSellerforAppJson(productObj).subscribe(res => {
      //  ;
      //this.spinner.hide();
      debugger

      this.productskartBestSeller = res.filter(item => item.TopSelling == true);
      this.productskartNewProduct = res.filter(item => item.Latest == true);
      this.productskartOnSale = res.filter(item => item.OnSale == true);
    });
  }

}
