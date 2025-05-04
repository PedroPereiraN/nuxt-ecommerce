import { appClient } from "~/lib/axios";

import type { HomeImageCarousel } from "~/utils/api-types";

export async function getCarouselImages() {
  const response = await appClient.get<HomeImageCarousel[]>(
    "/home-carousel-images",
  );

  return response.data;
}
