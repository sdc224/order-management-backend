import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, ValidateNested } from "class-validator";

import { ProductReqDto } from "./product-req.dto";

export class ProductDeleteReqDto {
	@ApiProperty()
	@Type(() => ProductReqDto)
	@ValidateNested()
	product: ProductReqDto[];

	@IsBoolean()
	@ApiProperty({ default: false })
	deleteAll: boolean;
}
