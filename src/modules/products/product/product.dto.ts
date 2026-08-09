import { Types } from "mongoose";

export interface CreateProductDTO {
  name: string;
  description?: string;
  brand: string;
  category: Types.ObjectId;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  brand?: string;
  category?: Types.ObjectId;
}
