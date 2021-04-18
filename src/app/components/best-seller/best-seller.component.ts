import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
//import { ProductsService } from '../../services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';
import { ProductsService } from 'src/app/Service/Products.service';
import { Productkart } from 'src/app/shared/classes/productkart';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
})
export class BestSellerComponent implements OnInit {

  //products: Product[];
  @Input() productskart: Productkart[] = [];

  //public productskartselling: Productkart[] = [];

  public ProductImage = environment.ProductImage;
  public user: any[] = JSON.parse(localStorage.getItem('LoggedInUser'));

  public Currency = { name: 'Rupees', currency: 'INR', price: 1 } // Default Currency

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  constructor(
    private _prodService: ProductsService,
    private modalController: ModalController
    //private productsService: ProductsService
  ) {

  }

  ngOnInit() {
    //this.getProductList();
    //this.BindProductByCategory();
  }

  // getProductList() {
  //   this.products = this.productsService.productList();
  // }

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


  //Added on 08/07/2020
  // BindProductByCategory() {
  //    debugger
  //   // let productObj = {
  //   //   Active: true,
  //   //   Subcatecode: ''
  //   // }
  //   // //this.spinner.show();
  //   // this._prodService.GetBestSellerforAppJson(productObj).subscribe(products => {
  //   //   //  ;
  //   //   //this.spinner.hide();
  //   //   debugger

  //   this.productskartselling = this.products.filter(item => item.topSelling == true);
  //   // });
  // }
}
