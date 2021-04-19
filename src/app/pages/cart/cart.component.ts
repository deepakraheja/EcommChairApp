
/**
 * Cart Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */


import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Service/Products.service';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { CartService } from 'src/app/Service/cart.service';
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { environment } from 'src/environments/environment';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { LoadingService } from 'src/app/Service/loading.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public headers: any = ["COLOR", "SIZE", "QUANTITY", "DELETE"];
  public products: Product[] = [];
  public lstCartProduct: any[] = [];
  public productSizeColor: productSizeColor[] = [];
  public IsEmptyCart = false;
  public ProductImage = environment.ProductImage;
  user: any[] = null;
  public TotalAmount = 0; TotalPieces = 0; Price = 0; Discount = 0;
  public SelectedProduct: any;

  cartProducts: Product[] = [];
  total: number = 0;

  constructor(public modalController: ModalController,
    public storageService: StorageService,
    private router: Router,
    public productService: ProductsService,
    private _SharedDataService: SharedDataService,
    private _cartService: CartService,
    // private toastrService: ToastrService,
    // private spinner: NgxSpinnerService,
    // private modalService: NgbModal,
    private _productService: ProductsService,
    public loading: LoadingService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this._SharedDataService.lstCart.subscribe(res => {
      this.LoadCart();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidEnter() {
    this.LoadCart();
  }

  LoadCart() {
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (this.user != null) {
      let obj = {
        UserID: this.user[0].userID
      };
      this.loading.present();
      this._cartService.GetCartById(obj).subscribe(response => {
        //  
        debugger
        if (response.length == 0)
          this.IsEmptyCart = true;
        else
          this.IsEmptyCart = false;
        this.loading.dismiss();
        this.productSizeColor = response;
        this.getTotal();

      });
    }
    else {
      this.IsEmptyCart = true;
      this.productSizeColor = [];
      this.getTotal();
    }

  }


  getTotal() {
    this.TotalAmount = 0;
    this.TotalPieces = 0;
    this.Price = 0;
    this.Discount = 0;
    this.productSizeColor.forEach(element => {
      this.TotalPieces += element.totalPieces;
      if (element.setType != 3) {
        this.Price += element.salePrice * element.totalPieces;
      }
      else {
        this.Price += element.salePrice;
      }

      //this.TotalAmount += element.salePrice;
      this.Discount += element.discount
    });
    //return TotalAmount;
  }
  ColorSize(product) {

    var arr = product.split('|');
    return arr;
  }


  // Increament
  increment(product, qty = 1) {
    //  
    debugger
    let obj = [{
      UserID: Number(this.user[0].userID),
      ProductSizeId: Number(product.productSizeId),
      Quantity: qty,
      SetNo: Number(product.setNo),
      ProductId: Number(product.productId)
    }];
    this.loading.present();
    this._cartService.UpdateToCart(obj).subscribe(res => {
      this.presentToast("Product quantity has been successfully updated in cart.");

      this.LoadCart();
      this._SharedDataService.UserCart(this.productSizeColor);
    });
    // this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    //  
    debugger
    if (product.quantity > (product.isPersonal == true ? 1 : (product.moq == 0 ? 1 : product.moq))) {
      let obj = [{
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(product.productSizeId),
        Quantity: qty,
        SetNo: Number(product.setNo),
        ProductId: Number(product.productId)
      }];
      this.loading.present();
      this._cartService.UpdateToCart(obj).subscribe(res => {
        this.presentToast("Product quantity has been successfully updated in cart.");
        this.LoadCart();
        this._SharedDataService.UserCart(this.productSizeColor);
      });
    }
    // this.productService.updateCartQuantity(product, qty);
  }


  public removeItem(product) {
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    //  
    let obj = {
      CartId: product.cartId,
      UserID: this.user[0].userID,
      SetNo: product.setNo,
      SetType: product.setType,
      ProductId: product.productId
    };
    this.loading.present();
    this._cartService.DelCartById(obj).subscribe(res => {
      this.loading.dismiss();
      this.presentToast('Product has been removed successfully from your cart.');
      this.LoadCart();
      this._SharedDataService.UserCart([]);
    });
  }

  // Go to product details page
  async goToProductDetails(product) {
    debugger
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: {
        rowID: product.rowID,
        productSizeId: product.productSizeId
      }
    });
    return await modal.present();
  }



  // Get Cart Items From Storage
  getCartItems() {
    this.storageService.getObject('my-cart').then((products) => {
      this.cartProducts = products;
      for (var i = 0; i < this.cartProducts.length; i++) {
        this.total += this.cartProducts[i].discountPrice * this.cartProducts[i].quantity;
      }
    });
  }

  // Minus Product Quantity
  minusQuantity(product, index) {
    if (product.quantity > 1) {
      product.quantity = product.quantity - 1;
      this.total = this.total - product.discountPrice;
    }
  }

  // Add More Quantity
  addQuantity(product, index) {
    if (product.quantity) {
      product.quantity = product.quantity + 1;
    } else {
      product.quantity = 1;
      product.quantity = product.quantity + 1;
    }
    this.total = this.total + product.discountPrice;
  }

  // Remove Product From Cart
  async removeProduct(product, index) {
    this.cartProducts.splice(index, 1);
    await this.storageService.removeStorageValue(product.id, 'my-cart');
    await this.getCartItems();
    this.total = this.total - (product.discountPrice * product.quantity);
  }

  // Go to checkout page
  async goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  // Back to previous page options
  dismiss() {
    this.router.navigate(['/tabs/tab1']);
  }
}
