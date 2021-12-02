// import {
// 	Column,
// 	Entity,
// 	JoinColumn,
// 	OneToMany,
// 	PrimaryGeneratedColumn
// } from "typeorm";

// import { UserRoleEntity } from "./user-role.entity";

// @Entity({ name: "roles" })
// export class RoleEntity {
// 	@PrimaryGeneratedColumn("increment")
// 	id: number;

// 	@Column()
// 	roleName: string;

// 	@OneToMany(() => UserRoleEntity, (userRole) => userRole.role, {
// 		cascade: true,
// 		onDelete: "CASCADE",
// 		onUpdate: "CASCADE"
// 	})
// 	@JoinColumn({ referencedColumnName: "role_id" })
// 	userRoles!: UserRoleEntity[];
// }
