import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { ProductEntity } from "../product/product.entity";
import { CartSessionEntity } from "./cart-session.entity";

@Entity({ name: "cart_product" })
export class CartProductEntity extends AbstractEntity {
	@OneToOne(() => CartSessionEntity)
	@JoinColumn()
	cartSession?: CartSessionEntity;

	@ManyToOne(() => ProductEntity)
	product?: ProductEntity;

	@Column({ nullable: true })
	quantity?: number;
}
