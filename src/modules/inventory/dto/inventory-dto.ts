import { ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/abstract.dto";
import type { InventoryEntity } from "../inventory.entity";

export class InventoryDto extends AbstractDto {
	@ApiPropertyOptional()
	quantity?: number;

	constructor(inventory: InventoryEntity) {
		super(inventory);

		this.quantity = inventory.quantity;
	}
}
