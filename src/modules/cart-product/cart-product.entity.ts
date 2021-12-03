import { Column, Entity, ManyToOne } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { ProductEntity } from "../product/product.entity";

@Entity({ name: "cart_product" })
export class CartProductEntity extends AbstractEntity {
	@ManyToOne(() => ProductEntity)
	product?: ProductEntity;

	@Column({ nullable: true })
	quantity?: number;
}
