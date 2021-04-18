import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { FilterComponent } from '../filter/filter.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'Showall/:type',
        component: ProductsComponent
      },
      {
        path: 'productDetails/:rowID/:productSizeId',
        component: ProductDetailsComponent
      }
    ])
  ],
  declarations: [
    ProductsComponent,
    FilterComponent],
  entryComponents: [FilterComponent],
  providers: []
})
export class ProductsModule { }
