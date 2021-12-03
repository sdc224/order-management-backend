import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class OrderProductEntity extends AbstractEntity {
	@OneToOne(() => UserEntity)
	@JoinColumn()
	user?: UserEntity;

	@Column({ nullable: true, type: "decimal", precision: 12, scale: 2 })
	total?: number;
}
