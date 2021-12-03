import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";

import { CartSessionEntity } from "./cart-session.entity";

@EntityRepository(CartSessionEntity)
export class CartSessionRepository extends Repository<CartSessionEntity> {}
