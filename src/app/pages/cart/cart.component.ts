import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from 'src/app/models/cart.model';
import {CartService} from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: `./cart.component.html`,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart: Cart = { items: [] };

  dataSource: Array<CartItem> = [];

  displayedColumns: Array<String> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.cart.subscribe((_cart: Cart) => {
        this.cart = _cart;
        this.dataSource = this.cart.items;
    });
  }

  total(price: string, quantity: string): number {
    return  parseFloat(price) * parseFloat(quantity);
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
}
