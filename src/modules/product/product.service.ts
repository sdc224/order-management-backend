import { Injectable } from "@nestjs/common";
import type { FindConditions } from "typeorm";

import type { PageDto } from "../../common/dto/page.dto";
import type { Optional } from "../../types";
import type { ProductDto } from "./dto/product.dto";
import type { ProductReqDto } from "./dto/product-req.dto";
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

	async getListOfProduct(product: ProductReqDto[]): Promise<ProductEntity[]> {
		return this.productRepository
			.createQueryBuilder("product")
			.leftJoinAndSelect("product.inventory", "inventory")
			.where("product.id IN (:productId)", {
				productId: product.map((p) => p.id).join(",")
			})
			.getMany();
	}

	async isProductAvailable(
		product: ProductReqDto,
		quantity: number
	): Promise<ProductEntity | undefined> {
		return this.productRepository
			.createQueryBuilder("product")
			.leftJoinAndSelect("product.inventory", "inventory")
			.where("product.id = :productId", { productId: product.id })
			.andWhere("product.name = :name", { name: product.name })
			.andWhere("inventory.quantity > :quantity", { quantity })
			.getOne();
	}
}
