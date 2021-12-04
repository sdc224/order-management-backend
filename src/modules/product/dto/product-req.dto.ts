import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ProductReqDto {
	@IsString()
	@ApiProperty()
	readonly id: string;

	@IsString()
	@ApiProperty()
	readonly name: string;

	@IsNumber()
	@ApiPropertyOptional({ default: 1 })
	readonly quantity?: number;
}
