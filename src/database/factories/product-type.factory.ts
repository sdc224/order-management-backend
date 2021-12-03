import { define } from "typeorm-seeding";

import { ProductTypeEntity } from "../../modules/product-type/product-type.entity";

define(ProductTypeEntity, (faker) => {
	const name = faker.commerce.department();
	const description = faker.commerce.productMaterial();

	const productType = new ProductTypeEntity();
	productType.name = name;
	productType.description = description;

	return productType;
});
