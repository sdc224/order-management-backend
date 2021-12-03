import { Column, Entity } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";

@Entity()
export class ProductTypeEntity extends AbstractEntity {
	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;
}
