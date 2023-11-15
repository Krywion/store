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
  page: number = 0;
  maxPage: number = 0;

  constructor(private cartService: CartService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getMaxPage();
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
      this.page = 0;
      this.itemsAmount = itemsAmount;
      this.getProducts();
      this.getMaxPage();
  }

  onChangeCategory(category: string): void {
        this.category = category;
        this.getProducts();
        this.getMaxPage();
    }

  getProducts(): void {
    if (!this.category) {
      this.productService.getProducts(this.page, this.itemsAmount).subscribe((products) => {
        this.products = products;
      });
    } else {
      this.productService.getProductsByCategory(this.page, this.itemsAmount, this.category).subscribe((products) => {
        this.products = products;
      });
    }


  }

  sortChange(sort: string) {
    this.sort = sort;
    this.sortProducts();
  }

  private sortProducts() {
    this.products.sort((a, b) => {
      if (this.sort === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  onSearch(search: string) {
    if(!search) {
      this.getProducts();
    }
    this.products = this.products.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase());
    });
  }

  onChangePage(condition: string) {
    if(condition === "next" && this.page < this.maxPage - 1) {
      this.page++;
      this.getProducts()
    } else if(condition === "previous" && this.page > 0){
      this.page--;
      this.getProducts()
    }

  }

  private getMaxPage() {
    if(!this.category) {
    this.productService.getProductsCount().subscribe((count) => {
        this.maxPage = Math.ceil(count / this.itemsAmount);
    });
  } else {
      this.productService.getProductsCountByCategory(this.category).subscribe((count) => {
        this.maxPage = Math.ceil(count / this.itemsAmount);
      });
    }
  }
}
