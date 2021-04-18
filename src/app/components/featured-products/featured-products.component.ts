import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';
import { Productkart } from 'src/app/shared/classes/productkart';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {

  products: Product[];
  @Input() productskart: Productkart[] = [];

   public ProductImage = environment.ProductImage;
  // Slider Options
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  constructor(private productsService: ProductsService,
    private modalController: ModalController) { }

  ngOnInit() {
    //this.getProductList();
  }

  getProductList() {
    this.products = this.productsService.productList();
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

}
