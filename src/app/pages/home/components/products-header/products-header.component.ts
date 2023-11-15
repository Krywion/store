import {Component, EventEmitter, Input, Output} from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: `products-header.component.html`,
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit{
  sort: string = 'desc'
  itemsShowCount: number = 12;
  @Input() productsCount: number = 0;
  @Output() itemsShowCountChange = new EventEmitter<number>;
  @Output() columnsCountChange = new EventEmitter<number>;
  @Output() sortChange = new EventEmitter<string>;

  constructor() {

  }

  ngOnInit(): void {
    this.itemsShowCountChange.emit(this.itemsShowCount);
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsShowCountChange.emit(this.itemsShowCount);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
