import { Column, Entity } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { UseDto } from "./../../decorators/use-dto.decorator";
import { InventoryDto } from "./dto/inventory-dto";

@Entity({ name: "inventory" })
@UseDto(InventoryDto)
export class InventoryEntity extends AbstractEntity {
	@Column({ default: 0 })
	quantity: number;
}
