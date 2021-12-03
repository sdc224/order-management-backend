/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from "typeorm-seeding";

import { ProductTypeEntity } from "../../modules/product-type/product-type.entity";

export default class CreateProductTypes implements Seeder {
	public async run(factory: Factory): Promise<void> {
		await factory(ProductTypeEntity)().createMany(40);
	}
}
