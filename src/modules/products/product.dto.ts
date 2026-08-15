export interface CreateProductDTO {
  name: string;
  sku: string;
  slug: string;
  description?: string;
  brand: string;
  categorySlug: string;
}

export interface UpdateProductDTO {
  name?: string;
  sku?: string;
  slug?: string;
  description?: string;
  brand?: string;
  categorySlug?: string;
}