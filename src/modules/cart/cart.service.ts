import { Injectable } from "@nestjs/common";
import type { DeleteResult } from "typeorm";

import type { ProductEntity } from "../product/product.entity";
import type { UserEntity } from "../user/user.entity";
import type { ProductReqDto } from "./../product/dto/product-req.dto";
import { ProductService } from "./../product/product.service";
// import type { ProductsPageOptionsDto } from "./dto/products-page-options.dto";
import { CartProductRepository } from "./cart-product.repository";
import { CartSessionRepository } from "./cart-session.repository";
import type { CartDto } from "./dto/cart.dto";
import { CartDeleteDto } from "./dto/cart-delete.dto";
import type { CartProductDto } from "./dto/cart-product.dto";

@Injectable()
export class CartService {
	constructor(
		public readonly cartProductRepository: CartProductRepository,
		public readonly cartSessionRepository: CartSessionRepository,
		public readonly productService: ProductService
	) {}

	async getProduct(productDto: ProductReqDto): Promise<ProductEntity> {
		const product = await this.productService.findOne({
			id: productDto.id,
			name: productDto.name
		});

		return product!;
	}

	async getCartProducts(user: UserEntity): Promise<CartProductDto[]> {
		const products = await this.cartProductRepository
			.createQueryBuilder("cartProduct")
			.leftJoinAndSelect("cartProduct.cartSession", "cartSession")
			.where("cartSession.user.id = :userId", { userId: user.id })
			.select("cartProduct")
			.getMany();

		return products.map((p) => p.toDto());
	}

	async createOrUpdateCart(
		user: UserEntity,
		product: ProductEntity,
		quantity = 1
	): Promise<CartDto> {
		let total = 0;

		const existingCartTotal = await this.cartSessionRepository
			.createQueryBuilder("cartSession")
			.where("cartSession.user.id = :userId", { userId: user.id })
			.select("cartSession.total")
			.getRawOne();

		if (Number.parseInt(existingCartTotal, 10) > 0) {
			total = existingCartTotal;
		}

		if (
			product &&
			product.inventory?.quantity &&
			product.inventory?.quantity > 0
		) {
			total += product.price! * quantity;
		}

		const cartSession = await this.cartSessionRepository.save({
			user,
			total
		});
		const cartProduct = await this.cartProductRepository.save({
			product,
			quantity
		});

		return { cartProduct, cartSession };
	}

	async reset(user: UserEntity): Promise<CartDeleteDto> {
		let cartSessionDelete = {} as DeleteResult;
		let cartProductDelete = {} as DeleteResult;

		const cartSession = await this.cartSessionRepository
			.createQueryBuilder("cartSession")
			.where("cartSession.user.id = :userId", { userId: user.id })
			.select()
			.getOne();

		if (cartSession) {
			cartProductDelete = await this.cartProductRepository.delete({
				cartSession
			});
		}

		cartSessionDelete = await this.cartSessionRepository.delete({
			user
		});

		return new CartDeleteDto(cartSessionDelete, cartProductDelete);
	}
}
