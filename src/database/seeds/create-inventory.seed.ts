/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from "typeorm-seeding";

import { InventoryEntity } from "../../modules/inventory/inventory.entity";

export default class CreateInventories implements Seeder {
	public async run(factory: Factory): Promise<void> {
		await factory(InventoryEntity)().createMany(40);
	}
}
