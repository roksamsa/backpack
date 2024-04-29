import qs from "qs";
import { getAuthToken } from "./token-service";
import { getBackendURL } from "../utils/general";
import { Category } from "../shared/types";

const query = qs.stringify({
  populate: { image: { fields: ["url", "alternativeText"] } },
});

const baseAPIUrl = getBackendURL();
const authToken = getAuthToken();
const baseAPIHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken}`,
};
let categories: Category[] = [];
const categoriesDefaultFirstItem: Category = {
  id: 0,
  attributes: {
    name: "Dashboard",
    createdAt: "2024-04-26T12:27:46.904Z",
    updatedAt: "2024-04-26T13:18:56.368Z",
    publishedAt: "2024-04-26T12:28:03.655Z",
    url: "/app/dashboard",
    description: "Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
};

export async function getCategories() {
  const url = new URL("/api/categories", baseAPIUrl);
  url.search = query;

  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: baseAPIHeaders,
      cache: "no-cache",
    });
    const data = await response.json();

    categories = data?.data;
    categories?.unshift(categoriesDefaultFirstItem);

    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}

export async function getCategoryById(categoryId: number) {
  const url = new URL(`/api/categories/${categoryId}`, baseAPIUrl);
  url.search = query;

  if (!authToken) return { ok: false, data: null, error: null };

  if (categoryId === 0) {
    await getCategories();
    const data = categories[0];
    return { ok: true, data: data, error: null };
  }

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: baseAPIHeaders,
      cache: "no-cache",
    });
    const data = await response.json();
    console.log("AAAAAAA", data);

    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
