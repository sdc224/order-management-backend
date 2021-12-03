/* eslint-disable @typescript-eslint/no-explicit-any */
import { define, factory } from "typeorm-seeding";

import { InventoryEntity } from "../../modules/inventory/inventory.entity";
import { ProductEntity } from "../../modules/product/product.entity";
import { ProductTypeEntity } from "../../modules/product-type/product-type.entity";

define(ProductEntity, (faker) => {
	const name = faker.commerce.productName();
	const description = faker.commerce.product();
	const price = Number.parseInt(faker.commerce.price(), 10);

	const product = new ProductEntity();
	product.name = name;
	product.description = description;
	product.price = price;
	product.productType = factory(ProductTypeEntity)() as any;
	product.inventory = factory(InventoryEntity)() as any;

	return product;
});
