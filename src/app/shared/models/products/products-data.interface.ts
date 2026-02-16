import { Brand } from '../brand/brand.interface';
import { Category } from '../category/category.interface';
import { SubCategory } from '../sub-category/sub-category.interface';

export interface ProductsData {
  sold: null | number;
  images: string[];
  subcategory: SubCategory;
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
  __v?: number;
  reviews?: any[];
}

export interface ProductsQueryParams {
  categoryId: string | undefined;
  brandId: string | undefined;
  page: number;
  sort: string;
}
