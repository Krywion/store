import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";

const ROWS_HEIGHT: {[id:number]: number} = {1:400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  cols: number = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Product[] = [];
  itemsAmount: number = 12;
  sort: string = 'desc';

  constructor(private cartService: CartService, private productService: ProductService) {
  }



  ngOnInit(): void {
    this.productService.getProducts(this.itemsAmount).subscribe((products) => {
      this.products = products;
    });
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(itemsAmount: number): void {
      this.itemsAmount = itemsAmount;
      this.productService.getProducts(this.itemsAmount).subscribe((products) => {
      this.products = products;
    });
    for (const product of this.products) {
      console.log(product.category)

    }
    }


  onChangeCategory(category: string): void {
        this.productService.getProductsByCategory(this.itemsAmount, category).subscribe((products) => {
        this.products = products;
        });
    }

  getProductsOfCategory(category: string): Product[] {
    return this.products.filter((product) => product.category === category);
  }

  sortChange(sort: string) {
    this.sort = sort;
    this.products.sort((a, b) => {
      if (sort === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
}
