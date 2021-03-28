
/**
 * Category Screen
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   ThemesBuckets
 */

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { SubCategoryService } from 'src/app/Service/Subcategory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categories: any[];
  grid: Boolean = true;
  oneColumn: Boolean = false;
  list: Boolean = false;

  constructor(private router: Router,
    private _subcatService: SubCategoryService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  // Get list of categories
  getCategories() {

    let subCatObj = {
      SideSubCategory: null
    }
    this._subcatService.GetSideSubcategory(subCatObj).subscribe(res => {
      this.categories = res;
    });

    // this.categories = this.categoryService.categoryList();
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

  // Go to cart page function
  async gotoCartPage() {
    this.router.navigate(['/cart']);
  }
}
