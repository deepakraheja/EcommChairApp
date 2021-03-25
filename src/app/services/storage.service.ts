/**
* Storage Services
* @author    ThemesBuckets <themebucketbd@gmail.com>
* @copyright Copyright (c) 2020
* @license   ThemesBuckets
*/


import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Product } from '../models/product.model';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setObject(product: Product, ITEMS_KEY) {
    await Storage.get({ key: ITEMS_KEY }).then(async (products: any) => {

      if (products.value) {
        let newProducts: any = JSON.parse(products.value);
        newProducts.push(product);

        await Storage.set({
          key: ITEMS_KEY,
          value: JSON.stringify(newProducts)
        });
      } else {
        await Storage.set({
          key: ITEMS_KEY,
          value: JSON.stringify([product])
        });
      }
    })
  }

  async getObject(ITEMS_KEY) {
    const ret: any = await Storage.get({ key: ITEMS_KEY });
    const products = JSON.parse(ret.value);

    return products;
  }

  async removeStorageValue(id: number, ITEMS_KEY) {
    const ret: any = await Storage.get({ key: ITEMS_KEY });
    const products = JSON.parse(ret.value);

    if (!products || products.length === 0) {
      return null;
    }

    let toKeep: Product[] = [];

    for (let i of products) {
      if (i.id !== id) {
        toKeep.push(i);
      }
    }

    await Storage.set({
      key: ITEMS_KEY,
      value: JSON.stringify(toKeep)
    });

    return true;
  }

  async clear() {
    await Storage.clear();
  }
}
