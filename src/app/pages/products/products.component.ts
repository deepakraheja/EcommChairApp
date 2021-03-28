/**
 * Product Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */


import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
// import { ProductsService } from '../../services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { FilterComponent } from '../filter/filter.component';
import { Productkart } from 'src/app/shared/classes/productkart';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ProductsService } from 'src/app/Service/Products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  // List of prodict
  products: Product[];
  public productskart: Productkart[] = [];
  grid: Boolean = true;
  oneColumn: Boolean = false;
  list: Boolean = false;


  public Allproductskart: Productkart[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 100000;
  public tags: any[] = [];
  public category: string;
  public searchQuery: string = '';
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private _prodService: ProductsService,
    public modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      this.brands = params.brand ? params.brand.split(",") : [];
      this.colors = params.color ? params.color.split(",") : [];
      this.size = params.size ? params.size.split(",") : [];
      this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

      this.category = params.category ? params.category : null;
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      this.pageNo = params.page ? params.page : this.pageNo;
      this.searchQuery = params.searchQuery ? params.searchQuery : null;

      debugger
      if (params.category == undefined || params.category) {
        this.BindProductByCategory();
      }
    });
  }

  BindProductByCategory() {
    // this.spinner.show();
    this.route.queryParams.subscribe((params: Params) => {

      const category = params['category'];
      let productObj = {
        Active: true,
        Subcatecode: category == 'chair' ? '' : category
      }
      debugger
      this._prodService.getProductByCategory(productObj).subscribe(products => {
        let FilteredProduct = products;
        this.Allproductskart = products;
        this.route.paramMap.subscribe((params: ParamMap) => {

          let type = params.get('type');
          if (type == 'Refilling') {
            FilteredProduct = products.filter(a => a.featured == true);
          }
          else if (type == 'BestSellers') {
            FilteredProduct = products.filter(a => a.topSelling == true);
          }
          else
            this.productskart = products;

          let BrandFilter: any[] = [];
          if (this.brands.length > 0) {
            (this.brands).forEach(element => {
              FilteredProduct.forEach(ele => {
                if (ele.brandName == element) {
                  BrandFilter.push(ele);
                }
              });
            });
            FilteredProduct = BrandFilter;
          }
          debugger
          if (this.searchQuery != '' && this.searchQuery != null)
            // searchQuery Filter
            this.productskart = this.productskart.filter(item => (item.productName).toLowerCase().indexOf((this.searchQuery).toLowerCase()) >= 0)
          // Brand Filter
          //this.productskart = this.productService.filter(FilteredProduct, this.sortBy);
          // Sorting Filter
          // this.productskart = this.productService.sortProducts(FilteredProduct, this.sortBy);
          // Price Filter
          this.productskart = this.productskart.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)
          if (this.searchQuery != '' && this.searchQuery != null)
            // searchQuery Filter
            this.productskart = this.productskart.filter(item => (item.productName).toLowerCase().indexOf((this.searchQuery).toLowerCase()) >= 0)
          ////  
          // Paginate Products
          // this.paginate = this.productService.getPager(this.productskart.length, +this.pageNo);     // get paginate object from service
          // this.productskart = this.productskart.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
          // setTimeout(() => this.spinner.hide(), 2000);
        });

      });
    });
  }


  ngOnInit() {
    // this.getProductList();
  }

  // Get List of Products
  // getProductList() {
  //   this.products = this.productsService.productList();
  // }

  // Go to product details page
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    return await modal.present();
  }

  // Open Filter page
  async openFilterPage() {
    const modal = await this.modalController.create({
      component: FilterComponent
    });
    return await modal.present();
  }

  // One column view function
  showOneColumn() {
    this.oneColumn = true;
    this.grid = false
    this.list = false;
  }

  // Grid view function
  showGrid() {
    this.grid = true;
    this.oneColumn = false;
    this.list = false;
  }

  // List view function
  showList() {
    this.list = true;
    this.grid = false;
    this.oneColumn = false;
  }

}
