import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

import { RoleType } from "../../constants/role-type";
import { Auth, AuthUser } from "../../decorators";
import { ProductDeleteReqDto } from "./../product/dto/product-delete-req.dto";
import { ProductReqDto } from "./../product/dto/product-req.dto";
import { UserEntity } from "./../user/user.entity";
// import { ProductsPageOptionsDto } from "./dto/products-page-options.dto";
import { CartService } from "./cart.service";
import { CartDto } from "./dto/cart.dto";
import { CartDeleteDto } from "./dto/cart-delete.dto";
import { CartProductDto } from "./dto/cart-product.dto";

@Controller("cart")
@ApiTags("cart")
export class CartController {
	constructor(private cartService: CartService) {}

	@Get("get")
	@Auth([RoleType.USER])
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: CartProductDto,
		description: "Get Product inside Cart"
	})
	async getCartProducts(
		@AuthUser() user: UserEntity
	): Promise<CartProductDto[]> {
		const products = await this.cartService.getCartProducts(user);

		return products.map((p) => p.toDto());
	}

	@Post("add")
	@Auth([RoleType.USER])
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: CartDto,
		description: "Cart add/update info"
	})
	async add(
		@AuthUser() user: UserEntity,
		@Body() product: ProductReqDto
	): Promise<CartDto> {
		const productEntityAvailable =
			await this.cartService.getProductAvailability(
				product,
				product.quantity || 1
			);

		if (!productEntityAvailable) {
			throw new Error("No Product Found!");
		}

		return this.cartService.createOrUpdateCart(
			user,
			productEntityAvailable,
			product.quantity
		);
	}

	@Post("delete")
	@Auth([RoleType.USER])
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: DeleteResult,
		description: "Cart delete info"
	})
	async delete(
		@AuthUser() user: UserEntity,
		@Body() productDeleteRequest: ProductDeleteReqDto
	): Promise<DeleteResult> {
		const productEntity = await this.cartService.getListOfProduct(
			productDeleteRequest.product
		);

		if (!productEntity) {
			throw new Error("No Product Found!");
		}

		return this.cartService.deleteCartProducts(
			user,
			productEntity,
			productDeleteRequest.deleteAll
		);
	}

	@Get("reset")
	@Auth([RoleType.USER])
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: CartDeleteDto,
		description: "Reset Product inside Cart"
	})
	async resetCart(@AuthUser() user: UserEntity): Promise<CartDeleteDto> {
		return this.cartService.reset(user);
	}
}
