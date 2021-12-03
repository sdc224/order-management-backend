import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProductReqDto {
	@IsString()
	@ApiProperty()
	readonly id: string;

	@IsString()
	@ApiProperty()
	readonly name: string;
}
