import { Component, OnInit, Input } from '@angular/core';
import { DealsService } from '../../services/deals.service';
import { Productkart } from 'src/app/shared/classes/productkart';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss'],
})
export class HotDealsComponent implements OnInit {
  @Input() productskart: Productkart[] = [];

  public ProductImage = environment.ProductImage;
  // Slider Options
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  deals: any = [];

  constructor(private dealsService: DealsService) { }

  ngOnInit() {
    this.getDeals();
  }

  getDeals() {
    this.deals = this.dealsService.getDeals();
  }

}
