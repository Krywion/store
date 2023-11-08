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

  constructor(private cartService: CartService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
      console.log(this.products.length);
    });
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log(this.category)
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
}
