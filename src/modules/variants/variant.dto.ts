export interface CreateVariantDTO {
  sku: string;
  attributes: Record<string, string>;
  price: number;
  stock?: number;
}

export interface UpdateVariantDTO {
  sku?: string;
  attributes?: Record<string, string>;
  price?: number;
  stock?: number;
}
