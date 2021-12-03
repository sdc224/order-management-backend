import { Column, Entity } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";

@Entity()
export class InventoryEntity extends AbstractEntity {
	@Column({ default: 0 })
	quantity: number;
}
