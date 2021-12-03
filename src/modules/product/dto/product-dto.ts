import { ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/abstract.dto";
import type { ProductEntity } from "../product.entity";

export class ProductDto extends AbstractDto {
	@ApiPropertyOptional()
	name?: string;

	@ApiPropertyOptional()
	description?: string;

	@ApiPropertyOptional()
	quantity?: number;

	@ApiPropertyOptional()
	productType?: string;

	@ApiPropertyOptional()
	price?: number;

	constructor(product: ProductEntity) {
		super(product);

		this.name = product.name;
		this.description = product.description;
		this.quantity = product.inventory?.quantity;
		this.productType = product.productType?.name;
		this.price = product.price;
	}
}
