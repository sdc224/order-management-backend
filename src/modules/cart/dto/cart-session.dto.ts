import { ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/abstract.dto";
import { UserEntity } from "../../user/user.entity";
import type { CartSessionEntity } from "../cart-session.entity";

export class CartSessionDto extends AbstractDto {
	@ApiPropertyOptional()
	user?: UserEntity;

	@ApiPropertyOptional()
	total?: number;

	constructor(cartSession: CartSessionEntity) {
		super(cartSession);

		this.user = cartSession.user;
		this.total = cartSession.total;
	}
}
