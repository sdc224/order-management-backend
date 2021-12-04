import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { UseDto } from "../../decorators";
import { ProductEntity } from "../product/product.entity";
import { CartSessionEntity } from "./cart-session.entity";
import { CartProductDto } from "./dto/cart-product.dto";

@Entity({ name: "cart_product" })
@UseDto(CartProductDto)
export class CartProductEntity extends AbstractEntity {
	@OneToOne(() => CartSessionEntity, { cascade: true })
	@JoinColumn()
	cartSession?: CartSessionEntity;

	@ManyToOne(() => ProductEntity)
	product?: ProductEntity;

	@Column({ nullable: true })
	quantity?: number;
}
