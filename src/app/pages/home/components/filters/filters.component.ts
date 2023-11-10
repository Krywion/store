import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-filters',
  templateUrl: `./filters.component.html`,
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit{
  @Output() showCategory = new EventEmitter<string>();
  @Output() changeCategory = new EventEmitter<string>();

  categories: string[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
    });
    console.log(this.categories)
  }

  onChangeCategory(category: string): void {
    this.showCategory.next(category)
    this.changeCategory.emit(category);
  }

}
