import { Column, Entity } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { UseDto } from "./../../decorators/use-dto.decorator";
import { ProductTypeDto } from "./dto/product-type-dto";

@Entity({ name: "product_type" })
@UseDto(ProductTypeDto)
export class ProductTypeEntity extends AbstractEntity {
	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;
}
