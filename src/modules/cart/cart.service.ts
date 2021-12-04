import { Injectable } from "@nestjs/common";
import type { DeleteResult } from "typeorm";

import type { ProductEntity } from "../product/product.entity";
import type { UserEntity } from "../user/user.entity";
import type { ProductReqDto } from "./../product/dto/product-req.dto";
import { ProductService } from "./../product/product.service";
import type { CartProductEntity } from "./cart-product.entity";
// import type { ProductsPageOptionsDto } from "./dto/products-page-options.dto";
import { CartProductRepository } from "./cart-product.repository";
import type { CartSessionEntity } from "./cart-session.entity";
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

	async getListOfProduct(
		productDto: ProductReqDto[]
	): Promise<ProductEntity[]> {
		return this.productService.getListOfProduct(productDto);
	}

	async getProductAvailability(
		productDto: ProductReqDto,
		quantity: number
	): Promise<ProductEntity | undefined> {
		return this.productService.isProductAvailable(productDto, quantity);
	}

	async getCartProducts(user: UserEntity): Promise<CartProductEntity[]> {
		return this.cartProductRepository
			.createQueryBuilder("cartProduct")
			.leftJoinAndSelect("cartProduct.cartSession", "cartSession")
			.leftJoinAndSelect("cartProduct.product", "product")
			.where("cartSession.user.id = :userId", { userId: user.id })
			.getMany();
	}

	private async getCartSingleProduct(
		userId: string,
		productId: string
	): Promise<CartProductEntity | undefined> {
		return this.cartProductRepository
			.createQueryBuilder("cartProduct")
			.leftJoinAndSelect("cartProduct.cartSession", "cartSession")
			.leftJoinAndSelect("cartProduct.product", "product")
			.where("cartSession.user.id = :userId", { userId })
			.andWhere("product.id = :productId", { productId })
			.getOne();
	}

	private async getCartSession(
		userId: string
	): Promise<CartSessionEntity | undefined> {
		return this.cartSessionRepository
			.createQueryBuilder("cartSession")
			.where("cartSession.user.id = :userId", { userId })
			.select("cartSession")
			.getOne();
	}

	async createOrUpdateCart(
		user: UserEntity,
		product: ProductEntity,
		quantity = 1
	): Promise<CartDto> {
		let total = 0;

		const existingCartSession = await this.getCartSession(user.id);

		const existingCartProduct = await this.getCartSingleProduct(
			user.id,
			product.id
		);

		if (product.price) {
			total += Number.parseInt(product.price.toString(), 10) * quantity;
		}

		if (existingCartProduct && existingCartSession?.total) {
			total += Number.parseInt(existingCartSession.total.toString(), 10);
		}

		if (!existingCartSession) {
			const cartSession = await this.cartSessionRepository.save({
				user,
				total
			});

			if (existingCartProduct) {
				await this.cartProductRepository.delete({
					product: { id: existingCartProduct.product?.id }
				});
			}

			const cartProduct = await this.cartProductRepository.save({
				cartSession,
				product,
				quantity
			});

			return { cartSession, cartProduct };
		}

		let cartProduct = {} as CartProductDto;

		const cartSession = await this.cartSessionRepository.save({
			id: existingCartSession.id,
			total
		});

		if (existingCartProduct) {
			quantity += existingCartProduct.quantity!;
			cartProduct = await this.cartProductRepository.save({
				id: existingCartProduct.id,
				quantity
			});
		} else {
			cartProduct = await this.cartProductRepository.save({
				cartSession,
				product,
				quantity
			});
		}

		return { cartProduct, cartSession };
	}

	async deleteCartProducts(
		user: UserEntity,
		product: ProductEntity[],
		deleteAll: boolean
	): Promise<DeleteResult> {
		// TODO : Delete Multiple Products based on Checkbox
		// Since TypeORM doesn't support Delete via join feature
		// @see: https://github.com/typeorm/typeorm/issues/427
		const select = `SELECT cp.id as cpId, cs.id as csId, cp.*, p.*, cs.*`;
		// eslint-disable-next-line max-len
		const joinQuery = `FROM cart_product as cp LEFT JOIN cart_session as cs ON cp.cart_session_id=cs.id LEFT JOIN products as p ON cp.product_id=p.id`;
		const whereClause = `WHERE cs.user_id=? AND cp.product_id IN (?)`;
		const setQuantityUpdateClause = `cp.quantity=?`;
		const setTotalUpdateClause = `cs.total=?`;
		const setCartProductClause = `cp.id=?`;
		const setCartSessionClause = `cs.id=?`;
		const updateCartProductQuery = `UPDATE cart_product as cp SET`;
		const updateCartSessionQuery = `UPDATE cart_session as cs SET`;

		const itemsToDeleteQuery = `${select} ${joinQuery} ${whereClause}`;

		const [itemsToDelete] = await this.cartProductRepository.query(
			itemsToDeleteQuery,
			[user.id, product.map((p) => p.id).join(",")]
		);

		let quantity = 0;
		let price = 0;

		quantity += Number.parseInt(itemsToDelete?.quantity?.toString?.(), 10);
		price += Number.parseInt(itemsToDelete?.price?.toString?.(), 10);

		const quantityDecrementQuery = `${updateCartProductQuery} ${setQuantityUpdateClause} WHERE ${setCartProductClause}`;
		const totalDecrementQuery = `${updateCartSessionQuery} ${setTotalUpdateClause} WHERE ${setCartSessionClause}`;

		if (!deleteAll) {
			await this.cartProductRepository.query(quantityDecrementQuery, [
				itemsToDelete.quantity - 1,
				itemsToDelete.cpId
			]);

			await this.cartSessionRepository.query(totalDecrementQuery, [
				itemsToDelete.total - price,
				itemsToDelete.csId
			]);

			return { affected: 1, raw: 1 };
		}

		await this.cartSessionRepository.query(totalDecrementQuery, [
			itemsToDelete.total - price * quantity,
			itemsToDelete.csId
		]);

		return this.cartProductRepository.delete({ id: itemsToDelete.cpId });
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
