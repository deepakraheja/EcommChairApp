import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';

//import { ToastrService } from 'ngx-toastr';
//import { Product } from '../classes/product';
//import { productSizeColor } from '../classes/productsizecolor';
//import { Productkart } from 'src/app/shared/classes/productkart';
//import { LoginComponent } from 'src/app/pages/account/login/login.component';
//import { SharedDataService } from 'src/app/Service/shared-data.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { CartService } from 'src/app/Service/cart.service';
//import { NgxSpinnerService } from 'ngx-spinner';
//import { WishListService } from 'src/app/Service/wish-list.service';

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public Currency = { name: 'Rupees', currency: 'INR', price: 1 } // Default Currency
  public OpenCart: boolean = false;
  public Products
  user: any[] = null;
  constructor(private http: HttpClient,
    // private toastrService: ToastrService,
    // private _SharedDataService: SharedDataService,
    // private modalService: NgbModal,
    // private _cartService: CartService,
    // private spinner: NgxSpinnerService,
    // private _wishListService: WishListService,
  ) { }

  /*
    ---------------------------------------------
    ---------------  Product  -------------------
    ---------------------------------------------
  */

  // Product
  // private get products(): Observable<Product[]> {
  //   this.Products = this.http.get<Product[]>('assets/data/products.json').pipe(map(data => data));
  //   this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
  //   return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  // }

  // // Get Products
  // public get getProducts(): Observable<Product[]> {
  //   return this.products;
  // }

  // // Get Products By Slug
  // public getProductBySlug(slug: string): Observable<Product> {
  //   return this.products.pipe(map(items => {
  //     return items.find((item: any) => {
  //       return item.title.replace(' ', '-') === slug;
  //     });
  //   }));
  // }


  // /*
  //   ---------------------------------------------
  //   ---------------  Wish List  -----------------
  //   ---------------------------------------------
  // */

  // // Get Wishlist Items
  // public get wishlistItems(): Observable<Product[]> {
  //   const itemsStream = new Observable(observer => {
  //     observer.next(state.wishlist);
  //     observer.complete();
  //   });
  //   return <Observable<Product[]>>itemsStream;
  // }

  // // Add to Wishlist
  // public addToWishlist(product): any {
  //   const wishlistItem = state.wishlist.find(item => item.id === product.id)
  //   if (!wishlistItem) {
  //     state.wishlist.push({
  //       ...product
  //     })
  //   }
  //   this.toastrService.success('Product has been added in wishlist.');
  //   localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
  //   return true
  // }

  // // Remove Wishlist items
  // public removeWishlistItem(product: any): any {
  //   // const index = state.wishlist.indexOf(product);
  //   // state.wishlist.splice(index, 1);
  //   // localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
  //   // return true

  //   this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
  //   //  
  //   let obj = {
  //     WishListId: product.wishListId
  //   };
  //   this.spinner.show();
  //   this._wishListService.DelWishListById(obj).subscribe(res => {
  //     this.spinner.hide();
  //     this.toastrService.success('Product has been removed successfully from your Wishlist.');
  //     this._SharedDataService.UserwishList([]);
  //   });
  //   return true
  // }

  // /*
  //   ---------------------------------------------
  //   -------------  Compare Product  -------------
  //   ---------------------------------------------
  // */

  // // Get Compare Items
  // public get compareItems(): Observable<Productkart[]> {
  //   const itemsStream = new Observable(observer => {
  //     observer.next(state.compare);
  //     observer.complete();
  //     localStorage.setItem("compareItems", JSON.stringify(state.compare));
  //     this._SharedDataService.Usercompare(state.compare);
  //   });
  //   return <Observable<Productkart[]>>itemsStream;
  // }

  // // Add to Compare
  // public addToCompare(product): any {
  //   const compareItem = state.compare.find(item => item.rowID === product.rowID)
  //   if (!compareItem) {
  //     state.compare.push({
  //       ...product
  //     })
  //   }
  //   this.toastrService.success('Product has been added in compare.');
  //   localStorage.setItem("compareItems", JSON.stringify(state.compare));
  //   this._SharedDataService.Usercompare(state.compare);
  //   return true
  // }

  // // Remove Compare items
  // public removeCompareItem(product: any): any {
  //   const index = state.compare.indexOf(product);
  //   state.compare.splice(index, 1);
  //   this.toastrService.success('Product has been removed in compare.');
  //   localStorage.setItem("compareItems", JSON.stringify(state.compare));
  //   this._SharedDataService.Usercompare(state.compare);
  //   return true
  // }

  // /*
  //   ---------------------------------------------
  //   -----------------  Cart  --------------------
  //   ---------------------------------------------
  // */

  // // Get Cart Items
  // public get cartItems(): Observable<Product[]> {
  //   const itemsStream = new Observable(observer => {
  //     observer.next(state.cart);
  //     observer.complete();
  //   });
  //   return <Observable<Product[]>>itemsStream;
  // }

  // // Get Cart Items
  // public get ProductcartItems(): Observable<Product[]> {
  //   const itemsStream = new Observable(observer => {
  //     observer.next(state.cart);
  //     observer.complete();
  //   });
  //   return <Observable<productSizeColor[]>>itemsStream;
  // }


  // // added on 13 july 2020 by deepak
  // //Add to Cart 
  // public addToCartProduct(product: any[]): any {
  //   //  ;
  //   //console.log(product);
  //   this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
  //   //  
  //   if (this.user == null || this.user == undefined) {
  //     //this.router.navigate(['/pages/login/cart']);
  //     this.modalService.open(LoginComponent, {
  //       size: 'lg',
  //       ariaLabelledBy: 'Cart-Modal',
  //       centered: true,
  //       windowClass: 'theme-modal cart-modal CartModal'
  //     });
  //   }
  //   else {
  //     // //  
  //     // let obj = {
  //     //   UserID: Number(this.user[0].userID),
  //     //   ProductSizeId: Number(product.productSizeId),
  //     //   Quantity: Number(product.quantity)
  //     // }
  //     this.spinner.show();
  //     this._cartService.AddToCart(product).subscribe(res => {
  //       this.spinner.hide();
  //       this.toastrService.success("Product has been successfully added in cart.");
  //       this._SharedDataService.UserCart([]);
  //     });
  //   }
  //   // const cartItem = state.cart.find(item => item.productSizeColorId === product.productSizeColorId);
  //   // const qty = product.quantity ? product.quantity : 1;
  //   // const items = cartItem ? cartItem : product;
  //   // const stock = this.calculateStockCounts(items, qty);

  //   // if (!stock) return false

  //   // if (cartItem) {
  //   //   cartItem.quantity += qty
  //   // } else {
  //   //   state.cart.push({
  //   //     ...product,
  //   //     quantity: qty
  //   //   })
  //   // }

  //   // this.OpenCart = true; // If we use cart variation modal
  //   // localStorage.setItem("cartItems", JSON.stringify(state.cart));
  //   return true;
  // }



  // // commnented on 13 july 2020 by deepak
  // // Add to Cart
  // public addToCart(product): any {
  //   //  

  //   this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
  //   //  
  //   if (this.user == null || this.user == undefined) {
  //     //this.router.navigate(['/pages/login/cart']);
  //     this.modalService.open(LoginComponent, {
  //       size: 'lg',
  //       ariaLabelledBy: 'Cart-Modal',
  //       centered: true,
  //       windowClass: 'theme-modal cart-modal CartModal'
  //     });
  //   }
  //   else {
  //     alert('hi');
  //   }
  //   const cartItem = state.cart.find(item => item.id === product.id);
  //   const qty = product.quantity ? product.quantity : 1;
  //   const items = cartItem ? cartItem : product;
  //   const stock = this.calculateStockCounts(items, qty);

  //   if (!stock) return false

  //   if (cartItem) {
  //     cartItem.quantity += qty
  //   } else {
  //     state.cart.push({
  //       ...product,
  //       quantity: qty
  //     })
  //   }

  //   this.OpenCart = true; // If we use cart variation modal
  //   localStorage.setItem("cartItems", JSON.stringify(state.cart));
  //   return true;
  // }

  // // Update Cart Quantity
  // public updateCartQuantity(product: Product, quantity: number): Product | boolean {
  //   return state.cart.find((items, index) => {
  //     if (items.id === product.id) {
  //       const qty = state.cart[index].quantity + quantity
  //       const stock = this.calculateStockCounts(state.cart[index], quantity)
  //       if (qty !== 0 && stock) {
  //         state.cart[index].quantity = qty
  //       }
  //       localStorage.setItem("cartItems", JSON.stringify(state.cart));
  //       return true
  //     }
  //   })
  // }

  // // Calculate Stock Counts
  // public calculateStockCounts(product, quantity) {
  //   const qty = product.quantity + quantity
  //   const stock = product.stock
  //   if (stock < qty || stock == 0) {
  //     this.toastrService.error('You can not add more items than available. In stock ' + stock + ' items.');
  //     return false
  //   }
  //   return true
  // }

  // // Remove Cart items
  // public removeCartItem(product: any): any {
  //   this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
  //   //  
  //   let obj = {
  //     CartId: product.cartId,
  //     UserID: this.user[0].userID,
  //     SetNo: product.setNo,
  //     SetType: product.setType,
  //     ProductId: product.productId
  //   };
  //   this.spinner.show();
  //   this._cartService.DelCartById(obj).subscribe(res => {
  //     this.spinner.hide();
  //     this.toastrService.success('Product has been removed successfully from your cart.');
  //     this._SharedDataService.UserCart([]);
  //   });
  //   // const index = state.cart.indexOf(product);
  //   // state.cart.splice(index, 1);
  //   // localStorage.setItem("cartItems", JSON.stringify(state.cart));
  //   return true
  // }

  // //added on 13 july 2020 by deepak
  // // Total amount 
  // public productcartTotalAmount(): Observable<number> {
  //   return this.cartItems.pipe(map((product: productSizeColor[]) => {
  //     return product.reduce((prev, curr: productSizeColor) => {
  //       let price = curr.salePrice;
  //       // if (curr.discount) {
  //       //   price = curr.price - (curr.price * curr.discount / 100)
  //       // }
  //       return (prev + price * curr.quantity);
  //     }, 0);
  //   }));
  // }

  // // commnented on 13 july 2020 by deepak
  // // Total amount 
  // public cartTotalAmount(): Observable<number> {
  //   return this.cartItems.pipe(map((product: Product[]) => {
  //     return product.reduce((prev, curr: Product) => {
  //       let price = curr.price;
  //       if (curr.discount) {
  //         price = curr.price - (curr.price * curr.discount / 100)
  //       }
  //       return (prev + price * curr.quantity) * this.Currency.price;
  //     }, 0);
  //   }));
  // }

  // /*
  //   ---------------------------------------------
  //   ------------  Filter Product  ---------------
  //   ---------------------------------------------
  // */

  // // Get Product Filter
  // public filterProducts(filter: any): Observable<Product[]> {
  //   return this.products.pipe(map(product =>
  //     product.filter((item: Product) => {
  //       if (!filter.length) return true
  //       const Tags = filter.some((prev) => { // Match Tags
  //         if (item.tags) {
  //           if (item.tags.includes(prev)) {
  //             return prev
  //           }
  //         }
  //       })
  //       return Tags
  //     })
  //   ));
  // }

  // // Sorting Filter
  // public sortProducts(products: Productkart[], payload: string): any {
  //   //  
  //   if (payload === 'ascending') {
  //     return products.sort((a, b) => {
  //       if (a.productID < b.productID) {
  //         return -1;
  //       } else if (a.productID > b.productID) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'a-z') {
  //     return products.sort((a, b) => {
  //       if (a.productName < b.productName) {
  //         return -1;
  //       } else if (a.productName > b.productName) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'z-a') {
  //     return products.sort((a, b) => {
  //       if (a.productName > b.productName) {
  //         return -1;
  //       } else if (a.productName < b.productName) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'low') {
  //     return products.sort((a, b) => {
  //       if (a.salePrice < b.salePrice) {
  //         return -1;
  //       } else if (a.salePrice > b.salePrice) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   } else if (payload === 'high') {
  //     return products.sort((a, b) => {
  //       if (a.salePrice > b.salePrice) {
  //         return -1;
  //       } else if (a.salePrice < b.salePrice) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   }
  // }

  // /*
  //   ---------------------------------------------
  //   ------------- Product Pagination  -----------
  //   ---------------------------------------------
  // */
  // public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 500) {
  //   // calculate total pages
  //   //  
  //   let totalPages = Math.ceil(totalItems / pageSize);

  //   // Paginate Range
  //   let paginateRange = 3;

  //   // ensure current page isn't out of range
  //   if (currentPage < 1) {
  //     currentPage = 1;
  //   } else if (currentPage > totalPages) {
  //     currentPage = totalPages;
  //   }

  //   let startPage: number, endPage: number;
  //   if (totalPages <= 5) {
  //     startPage = 1;
  //     endPage = totalPages;
  //   } else if (currentPage < paginateRange - 1) {
  //     startPage = 1;
  //     endPage = startPage + paginateRange - 1;
  //   } else {
  //     startPage = currentPage - 1;
  //     endPage = currentPage + 1;
  //   }

  //   // calculate start and end item indexes
  //   let startIndex = (currentPage - 1) * pageSize;
  //   let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  //   // create an array of pages to ng-repeat in the pager control
  //   let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

  //   // return object with all pager properties required by the view
  //   return {
  //     totalItems: totalItems,
  //     currentPage: currentPage,
  //     pageSize: pageSize,
  //     totalPages: totalPages,
  //     startPage: startPage,
  //     endPage: endPage,
  //     startIndex: startIndex,
  //     endIndex: endIndex,
  //     pages: pages
  //   };
  // }

  //  // added on 13 july 2020 by deepak
  // //Add to Cart 
  // public addToWishListProduct(product: any): any {
  //   //  ;
  //   //console.log(product);
  //   this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
  //   //  
  //   if (this.user == null || this.user == undefined) {
  //     //this.router.navigate(['/pages/login/cart']);
  //     this.modalService.open(LoginComponent, {
  //       size: 'lg',
  //       ariaLabelledBy: 'Cart-Modal',
  //       centered: true,
  //       windowClass: 'theme-modal cart-modal CartModal'
  //     });
  //   }
  //   else {
  //     this.spinner.show();
  //     this._wishListService.AddToWishList(product).subscribe(res => {
  //       this.spinner.hide();
  //       this.toastrService.success("Product has been successfully added in WishList.");
  //       this._SharedDataService.UserwishList([]);
  //     });
  //   }
  //   return true;
  // }

  // public addToWishToCartProduct(product: any): any {
  //   //  ;
  //   //console.log(product);
  //   this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
  //   //  
  //   if (this.user == null || this.user == undefined) {
  //     //this.router.navigate(['/pages/login/cart']);
  //     this.modalService.open(LoginComponent, {
  //       size: 'lg',
  //       ariaLabelledBy: 'Cart-Modal',
  //       centered: true,
  //       windowClass: 'theme-modal cart-modal CartModal'
  //     });
  //   }
  //   else {
  //     var obj: any[] = [];
  //     debugger
  //     obj.push({
  //       ProductSizeId: Number(product.productSizeId),
  //       Quantity: this.user[0].isPersonal == false ? (product.moq == 0 ? 1 : Number(product.moq)) : 1
  //     });
  //     this.spinner.show();
  //     this._cartService.AddToCart(obj).subscribe(res => {
  //       this.spinner.hide();
  //       this.toastrService.success("Product has been successfully added in cart.");
  //       this._SharedDataService.UserwishList([]);
  //       this._SharedDataService.UserCart([]);
  //     });
  //   }
  //   return true;
  // }


}
