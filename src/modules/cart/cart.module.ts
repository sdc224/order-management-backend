import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductModule } from "../product/product.module";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { CartProductRepository } from "./cart-product.repository";
import { CartSessionRepository } from "./cart-session.repository";

@Module({
	imports: [
		forwardRef(() => ProductModule),
		TypeOrmModule.forFeature([CartProductRepository, CartSessionRepository])
	],
	controllers: [CartController],
	exports: [CartService],
	providers: [CartService]
})
export class CartModule {}
