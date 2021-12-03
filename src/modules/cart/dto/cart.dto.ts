import { ApiProperty } from "@nestjs/swagger";

import { CartProductDto } from "./cart-product.dto";
import { CartSessionDto } from "./cart-session.dto";

export class CartDto {
	@ApiProperty()
	cartProduct: CartProductDto;

	@ApiProperty()
	cartSession: CartSessionDto;

	constructor(cartProduct: CartProductDto, cartSession: CartSessionDto) {
		this.cartProduct = cartProduct;
		this.cartSession = cartSession;
	}
}
