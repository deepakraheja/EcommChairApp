/**
 * Product Details Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  @Input() id: number;
  @Input() name: String;
  @Input() description: String;
  @Input() price: number;
  @Input() discountPrice: number;
  @Input() images: Array<String>;
  @Input() size: Array<String>;
  @Input() color: Array<String>;
  @Input() isWishlist: boolean;

  products: Product;

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    loop: true,
    autoplay: true,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };

  constructor(public router: Router,
    private storageService: StorageService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  // Add to Cart Function
  addToCart() {
    this.products = {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      discountPrice: this.discountPrice,
      images: this.images,
      size: this.size,
      color: this.color,
      quantity: 1,
      isWishlist: this.isWishlist
    }

    // Save cart product in storage
    this.storageService.setObject(this.products, 'my-cart');
  }

  // Go to cart page
  async gotoCartPage() {
    this.dismiss();
    this.router.navigate(['/cart']);
  }

  // Back to previous page function
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
