import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import type { PageDto } from "../../common/dto/page.dto";
import type { ProductDto } from "./dto/product.dto";
import { ProductsPageOptionsDto } from "./dto/products-page-options.dto";
import { ProductService } from "./product.service";

@Controller("/api/products")
@ApiTags("products")
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get("find")
	search(
		@Query(new ValidationPipe({ transform: true }))
		pageOptionsDto: ProductsPageOptionsDto
	): Promise<PageDto<ProductDto>> {
		return this.productService.getProducts(pageOptionsDto);
	}
}
