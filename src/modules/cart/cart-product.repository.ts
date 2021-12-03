import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";

import { CartProductEntity } from "./cart-product.entity";

@EntityRepository(CartProductEntity)
export class CartProductRepository extends Repository<CartProductEntity> {}
