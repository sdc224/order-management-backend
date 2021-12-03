import { Column, Entity, ManyToOne } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { ProductEntity } from "../product/product.entity";

@Entity()
export class OrderProductEntity extends AbstractEntity {
	@ManyToOne(() => ProductEntity)
	product?: ProductEntity;

	@Column({ nullable: true })
	quantity?: number;
}
