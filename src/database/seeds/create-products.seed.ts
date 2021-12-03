/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from "typeorm-seeding";

import { ProductEntity } from "../../modules/product/product.entity";

export default class CreateProducts implements Seeder {
	public async run(factory: Factory): Promise<void> {
		await factory(ProductEntity)().createMany(40);
	}
}
