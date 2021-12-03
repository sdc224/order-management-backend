import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { InventoryEntity } from "../inventory/inventory.entity";
import { ProductTypeEntity } from "../product-type/product-type.entity";

@Entity()
export class ProductEntity extends AbstractEntity {
	@Column()
	name: number;

	@Column({ nullable: true })
	description?: string;

	@OneToOne(() => InventoryEntity)
	@JoinColumn()
	inventory?: InventoryEntity;

	@ManyToOne(() => ProductTypeEntity)
	productType?: ProductTypeEntity;

	@Column({ nullable: true, type: "decimal", precision: 12, scale: 2 })
	price?: number;
}
