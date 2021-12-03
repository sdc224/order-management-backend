import { define } from "typeorm-seeding";

import { InventoryEntity } from "../../modules/inventory/inventory.entity";

define(InventoryEntity, (faker) => {
	const quantity = faker.random.number();

	const inventory = new InventoryEntity();
	inventory.quantity = quantity;

	return inventory;
});
