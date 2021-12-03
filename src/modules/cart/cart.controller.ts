import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { RoleType } from "../../constants/role-type";
import { Auth, AuthUser } from "../../decorators";
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
		return this.cartService.getCartProducts(user);
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
		const productEntity = await this.cartService.getProduct(product);

		if (!productEntity) {
			throw new Error("No Product Found!");
		}

		return this.cartService.createOrUpdateCart(user, productEntity, 1);
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
