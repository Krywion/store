import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-product-box',
  templateUrl: `./product-box.component.html`,
})
export class ProductBoxComponent implements OnInit {

    @Input() fullWidthMode = false;
    product: Product | undefined = {
        id: 1,
        title: 'Snickers',
        price: 150,
        category: 'chocolate',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores atque autem commodi consequatur cumque cupiditate, debitis doloribus ducimus ea, earum enim esse et eum facere fugit hic illum in incidunt inventore ipsam iste iure laboriosam laborum libero magnam magni maiores molestiae natus nemo nesciunt nihil nisi nobis nostrum nulla numquam odio officia officiis omnis optio pariatur perspiciatis placeat porro possimus quae quam quas quia quidem quisquam quod quos ratione reiciendis repellat reprehenderit repudiandae rerum saepe sapiente sequi sint sit soluta suscipit tempora temporibus tenetur totam ullam unde ut velit vero vitae voluptas voluptate voluptates voluptatum?',
        image: 'https://placehold.co/600x400'
    };
    @Output() addToCart = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }
}
