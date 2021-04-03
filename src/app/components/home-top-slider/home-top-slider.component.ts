import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Service/category.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-top-slider',
  templateUrl: './home-top-slider.component.html',
  styleUrls: ['./home-top-slider.component.scss'],
})
export class HomeTopSliderComponent implements OnInit {

  public ProductImage = environment.ProductImage;
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
  bannerItems: any[] = [];

  constructor(
    public _categoryService: CategoryService,

  ) { }

  ngOnInit() {

    this.BindBanner();
  }

  BindBanner(): void {

    this._categoryService.GetBannerJson().subscribe(res => {
      this.bannerItems = res;
      //sliders = this.bannerItems
    });

  }

}
