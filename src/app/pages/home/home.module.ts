import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { HotDealsComponent } from '../../components/hot-deals/hot-deals.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { HomeTopSliderComponent } from '../../components/home-top-slider/home-top-slider.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { BestSellerComponent } from 'src/app/components/best-seller/best-seller.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  declarations: [
    HomeComponent,
    FeaturedProductsComponent,
    HotDealsComponent,
    CategoriesComponent,
    HomeTopSliderComponent,
    SearchbarComponent,
    BestSellerComponent
  ]
})
export class HomeModule { }
