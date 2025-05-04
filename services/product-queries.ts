import { appClient } from "~/lib/axios";
import type { Product } from "~/utils/api-types";

export async function getBestSellers() {
  const response = await appClient.get<Product[]>("/best-sellers");

  return response.data;
}

export async function getProducts(itemsPerPage: number) {
  const response = await appClient.get<Product[]>(
    `/products?_page=1&_limit=${itemsPerPage}`,
  );

  return response.data;
}
