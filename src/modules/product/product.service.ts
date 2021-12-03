import { Injectable } from "@nestjs/common";
import type { FindConditions } from "typeorm";

import type { PageDto } from "../../common/dto/page.dto";
import type { Optional } from "../../types";
import type { ProductDto } from "./dto/product.dto";
import type { ProductsPageOptionsDto } from "./dto/products-page-options.dto";
import type { ProductEntity } from "./product.entity";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {
	constructor(public readonly productRepository: ProductRepository) {}

	/**
	 * Find single product
	 */
	findOne(
		findData: FindConditions<ProductEntity>
	): Promise<Optional<ProductEntity>> {
		return this.productRepository.findOne(findData);
	}

	async getProducts(
		pageOptionsDto: ProductsPageOptionsDto
	): Promise<PageDto<ProductDto>> {
		let queryBuilder = this.productRepository.createQueryBuilder("product");

		if (pageOptionsDto.q && pageOptionsDto.q.length > 0) {
			queryBuilder = queryBuilder.where("product.name like :name", {
				name: `%${pageOptionsDto.q}%`
			});
		}

		const [items, pageMetaDto] = await queryBuilder
			.leftJoinAndSelect("product.productType", "productType")
			.leftJoinAndSelect("product.inventory", "inventory")
			.paginate(pageOptionsDto);

		return items.toPageDto(pageMetaDto);
	}
}
