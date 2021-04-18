/**
 * Product Details Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Productkart } from 'src/app/shared/classes/productkart';
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { ProductsService } from 'src/app/Service/Products.service';
import { environment } from 'src/environments/environment';
import { SigninComponent } from '../auth/signin/signin.component';
import { CartService } from 'src/app/Service/cart.service';
import { LoadingService } from 'src/app/Service/loading.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  public Currency = { name: 'Rupees', currency: 'INR', price: 1 } // Default Currency
  @Input() id: number;
  @Input() name: String;
  @Input() description: String;
  @Input() price: number;
  @Input() discountPrice: number;
  @Input() images: Array<String>;
  @Input() size: Array<String>;
  @Input() color: Array<String>;
  @Input() isWishlist: boolean;

  public product: any[];
  public bigProductImageIndex = 0;

  public productkart: any[] = [];

  public productSizeColor: any[] = [];

  public activeSlide: any = 0;

  activeSlide1: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;
  // public ProductSliderConfig: any = ProductSlider;
  public recentlyProduct: any[] = [];
  public RelatedProducts: any[] = [];
  SelectedColor: any[] = [];
  public user: any[] = JSON.parse(localStorage.getItem('LoggedInUser'));

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


  // Slider Options
  slideOpts_Related = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private modalController: ModalController,
    private _prodService: ProductsService,
    private _cartService: CartService,
    public loading: LoadingService
  ) {






    // const rowID = this.navParams.get('rowID');
    // const productSizeId = this.navParams.get('productSizeId');

    // let productObj = {
    //   rowID: rowID,
    //   productSizeId: Number(productSizeId)
    // }
    // this.SelectedColor = [];
    // this.SelectedColor.push({
    //   productSizeId: Number(productSizeId)
    // });
    // this._prodService.GetWithoutSetProductByRowID(productObj).subscribe(res => {
    //   debugger
    //   if (!res) { // When product is empty redirect 404
    //     this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
    //   } else {

    //     this.productkart = res;
    //     this.recentlyProduct = res[0].userRecentlyProduct;
    //     this.RelatedProducts = res[0].relatedProduct;
    //     debugger
    //     //this.BindRelatedProductsByCategory(product[0].subcatecode);
    //   }
    //   // setTimeout(() => this.spinner.hide(), 1000);
    // });

  }

  ngOnInit() {
    debugger
    this.loading.present();
    this.route.params.subscribe(params => {
      const productid = params['rowID'];
      const productSizeId = params['productSizeId'];

      let productObj = {
        rowID: productid,
        productSizeId: Number(productSizeId)
      }
      this.SelectedColor = [];
      this.SelectedColor.push({
        productSizeId: Number(productSizeId)
      });

      debugger
      this._prodService.GetWithoutSetProductByRowID(productObj).subscribe(product => {
        if (!product) { // When product is empty redirect 404
          // this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
        } else {
          debugger
          this.productkart = product;
          this.recentlyProduct = product[0].userRecentlyProduct;
          this.RelatedProducts = product[0].relatedProduct;
          debugger
          //this.BindRelatedProductsByCategory(product[0].subcatecode);
        }
        // setTimeout(() => this.spinner.hide(), 1000);
      });
    });
  }

  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: {
        rowID: product.rowID,
        productSizeId: product.productSizeId
      }
    });
    return await modal.present();
  }


  // Add to Cart Function
  async addToCart(type: Number) {
    debugger
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    // //  
    if (this.user == null || this.user == undefined) {
      const modal = await this.modalController.create({
        component: SigninComponent
      });
      return await modal.present();
    }
    else {
      var obj: any[] = [];
      debugger
      obj.push({
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(this.SelectedColor[0].productSizeId),
        Quantity: this.user[0].isPersonal == false ? (this.productkart[0].moq == 0 ? 1 : Number(this.productkart[0].moq)) : 1
      });

      this._cartService.AddToCart(obj).subscribe(res => {
        // this.toastrService.success("Product has been successfully added in cart.");
        // this._SharedDataService.UserCart([]);
        if (res) {
          if (type == 1) {
            this.dismiss();
            this.router.navigate(['/cart']);
          }
          // this.router.navigate(['/shop/cart']);
          else {
            this.dismiss();
            this.router.navigate(['/checkout']);
          }
        }
      });
      //if (Number(obj.length) > 0) {
      // const status = await this.productService.addToCartProduct(obj);
    }
    // this.products = {
    //   id: this.id,
    //   name: this.name,
    //   description: this.description,
    //   price: this.price,
    //   discountPrice: this.discountPrice,
    //   images: this.images,
    //   size: this.size,
    //   color: this.color,
    //   quantity: 1,
    //   isWishlist: this.isWishlist
    // }

    // // Save cart product in storage
    // this.storageService.setObject(this.products, 'my-cart');
  }

  // Go to cart page
  async gotoCartPage() {
    this.dismiss();
    this.router.navigate(['/cart']);
  }

  // Back to previous page function
  dismiss() {
    // this.modalController.dismiss({
    //   'dismissed': true
    // })
    this.router.navigate(['./tabs/tab1']);
  }
}
