export interface CreateVariantDTO {
  attributes: Record<string, string>;
  price: number;
  stock?: number;
}

export interface UpdateVariantDTO {
  attributes?: Record<string, string>;
  price?: number;
  stock?: number;
}
