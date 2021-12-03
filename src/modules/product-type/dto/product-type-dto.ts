import { ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/abstract.dto";
import type { ProductTypeEntity } from "../product-type.entity";

export class ProductTypeDto extends AbstractDto {
	@ApiPropertyOptional()
	name?: string;

	@ApiPropertyOptional()
	description?: string;

	constructor(productType: ProductTypeEntity) {
		super(productType);

		this.name = productType.name;
		this.description = productType.description;
	}
}
