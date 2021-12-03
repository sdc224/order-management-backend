import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";

import { ProductEntity } from "./product.entity";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
