import { appClient } from "~/lib/axios";

export async function getCarouselImages() {
  const response = await appClient.get("/home-carousel-images");

  return response.data;
}

export async function getBestSellers() {
  const response = await appClient.get("/best-sellers");

  return response.data;
}

export async function getProducts() {
  const response = await appClient.get("/products");

  return response.data;
}
