import { appClient } from "~/lib/axios";
import type { HomeImageCarousel, Product } from "~/utils/api-types";

export async function getCarouselImages() {
  const response = await appClient.get<HomeImageCarousel[]>(
    "/home-carousel-images",
  );

  return response.data;
}

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
