import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];

  constructor() { }

  categoryList() {
    this.categories = [
      {
        id: 1,
        name: "Women",
        image: "assets/images/category/women-fashion.jpg"
      },
      {
        id: 2,
        name: "Men",
        image: "assets/images/category/men-fashion.jpg"
      },
      {
        id: 3,
        name: "Bags",
        image: "assets/images/category/luggage.jpg"
      },
      {
        id: 4,
        name: "Watches",
        image: "assets/images/category/watches.jpg"
      },
      {
        id: 5,
        name: "Jewelry",
        image: "assets/images/category/jewelry.jpg"
      },
      {
        id: 6,
        name: "Shoes",
        image: "assets/images/category/shoes.jpg"
      },
      {
        id: 7,
        name: "Computer",
        image: "assets/images/category/computer.jpg"
      },
      {
        id: 8,
        name: "Electronics",
        image: "assets/images/category/electronics.jpg"
      },
      {
        id: 9,
        name: "Home",
        image: "assets/images/category/home.jpg"
      },
      {
        id: 10,
        name: "Baby Store",
        image: "assets/images/category/baby.jpg"
      }
    ];

    return this.categories;
  }

}
