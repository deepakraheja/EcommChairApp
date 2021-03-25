/**
 * Search Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // List of Products
  products: Product[];

  // Check is product available or not
  isProductAvailable: boolean = false;

  constructor(public modalController: ModalController,
    private productsService: ProductsService,
    private router: Router) { }

  ngOnInit() {
    this.getProductList();
  }

  // Get All Products
  getProductList() {
    this.products = this.productsService.productList();
  }

  // Get Search Result
  getProducts(ev: any) {
    this.getProductList();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the product
    if (val && val.trim() != '') {
      this.isProductAvailable = true;
      this.products = this.products.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // Go to product details page function
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    return await modal.present();
  }

  // Go to cart page function
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }

  // Back to previous page function
  dismiss() {
    this.router.navigate(['/tabs/tab1']);
  }
}
