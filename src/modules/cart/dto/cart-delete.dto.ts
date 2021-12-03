import { ApiPropertyOptional } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

export class CartDeleteDto {
	@ApiPropertyOptional()
	cartProduct?: DeleteResult;

	@ApiPropertyOptional()
	cartSession?: DeleteResult;

	constructor(cartProduct?: DeleteResult, cartSession?: DeleteResult) {
		this.cartProduct = cartProduct;
		this.cartSession = cartSession;
	}
}
