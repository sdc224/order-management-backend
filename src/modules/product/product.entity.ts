import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { UseDto } from "../../decorators";
import { InventoryEntity } from "../inventory/inventory.entity";
import { ProductTypeEntity } from "../product-type/product-type.entity";
import { ProductDto } from "./dto/product.dto";

@Entity({ name: "products" })
@UseDto(ProductDto)
export class ProductEntity extends AbstractEntity {
	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@OneToOne(() => InventoryEntity, { cascade: true })
	@JoinColumn()
	inventory?: InventoryEntity;

	@ManyToOne(() => ProductTypeEntity)
	@JoinColumn()
	productType?: ProductTypeEntity;

	@Column({ nullable: true, type: "decimal", precision: 12, scale: 2 })
	price?: number;
}
