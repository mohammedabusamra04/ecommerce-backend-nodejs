import { User } from "../modules/users/user.model.js";
import { UserRepository } from "../modules/users/user.repository.js";
import { UserService } from "../modules/users/user.service.js";

import { RefreshToken } from "../modules/auth/refresh-token.model.js";
import { AuthRepository } from "../modules/auth/auth.repository.js";
import { AuthService } from "../modules/auth/auth.service.js";

import { Category } from "../modules/products/category/category.model.js";
import { CategoryRepository } from "../modules/products/category/category.repository.js";
import { CategoryService } from "../modules/products/category/category.service.js";

import { Product } from "../modules/products/product/product.model.js";
import { ProductRepository } from "../modules/products/product/product.repository.js";
import { ProductService } from "../modules/products/product/product.service.js";

import { Variant } from "../modules/products/variant/variant.model.js";
import { VariantRepository } from "../modules/products/variant/variant.repository.js";
import { VariantService } from "../modules/products/variant/variant.service.js";

const userRepository = new UserRepository(User);
export const userService = new UserService(userRepository);

const authRepository = new AuthRepository(RefreshToken);
export const authService = new AuthService(userService, authRepository);

const categoryRepository = new CategoryRepository(Category);
export const categoryService = new CategoryService(categoryRepository);

const productRepository = new ProductRepository(Product);
export const productService = new ProductService(productRepository);

const variantRepository = new VariantRepository(Variant);
export const variantService = new VariantService(
  variantRepository,
  productRepository
);
