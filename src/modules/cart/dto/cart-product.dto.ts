import { ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/abstract.dto";
import { ProductEntity } from "../../product/product.entity";
import type { CartProductEntity } from "../cart-product.entity";
import { CartSessionEntity } from "../cart-session.entity";

export class CartProductDto extends AbstractDto {
	@ApiPropertyOptional()
	product?: ProductEntity;

	@ApiPropertyOptional()
	quantity?: number;

	@ApiPropertyOptional()
	cartSession?: CartSessionEntity;

	constructor(cartProduct: CartProductEntity) {
		super(cartProduct);

		this.product = cartProduct.product;
		this.quantity = cartProduct.quantity;
		this.cartSession = cartProduct.cartSession;
	}
}
