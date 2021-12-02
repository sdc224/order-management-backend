// import {
// 	Column,
// 	Entity,
// 	JoinColumn,
// 	ManyToOne,
// 	PrimaryGeneratedColumn
// } from "typeorm";

// import { RoleEntity } from "./role.entity";
// import { UserEntity } from "./user.entity";

// @Entity({ name: "map_user_role_entity" })
// export class UserRoleEntity {
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@Column()
// 	userId!: number;

// 	@Column()
// 	roleId!: number;

// 	@ManyToOne(() => UserEntity, (user) => user.userRole)
// 	@JoinColumn({ name: "user_id" })
// 	user!: UserEntity;

// 	@ManyToOne(() => RoleEntity, (role) => role.userRoles)
// 	@JoinColumn({ name: "role_id" })
// 	role!: RoleEntity;
// }
