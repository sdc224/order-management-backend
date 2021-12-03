import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";

@Module({
	imports: [TypeOrmModule.forFeature([ProductRepository])],
	controllers: [ProductController],
	exports: [ProductService],
	providers: [ProductService]
})
export class ProductModule {}
