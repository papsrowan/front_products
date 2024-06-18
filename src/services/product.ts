import { TGetDataCategory } from "@/utils/type";
import { openAxiosInstance } from "./axios";

class ProductsService {
  //Récuperer les produits par categorie
  async getProductsByCategory({ name }: { name: string }) {
    const response = await openAxiosInstance.get(`/products/category/${name}`);
    return response.data as TGetDataCategory;
  }

  // Récuperer les categories de produits
  async getAllProdutsCategories() {
    const response = await openAxiosInstance.get("/products/categories");
    return response.data as any[];
  }
}
const productService = new ProductsService();
export { productService };
