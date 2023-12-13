import {component$, Slot, useStyles$} from "@builder.io/qwik";
import {Link, routeLoader$, useLocation} from "@builder.io/qwik-city";
import type {RequestHandler} from "@builder.io/qwik-city";

import styles from "./styles.css?inline";
import Header from "~/components/header";
import prismaClient from "~/lib/prismaClient";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const onGet: RequestHandler = async ({cacheControl}) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useCategories = routeLoader$(async () => {
  return await prismaClient.category.findMany();
})

const navItem = "p-2";
const navItemActive = `${navItem} bg-gray-300 text-black rounded-md font-bold`;

export default component$(() => {
  const categories = useCategories();
  const location = useLocation();

  useStyles$(styles);

  return (
      <>
        <Header/>
        <main class="p-2">
          <div class="md:grid md:grid-cols-[20%_80%] gap-3">
            <div class="flex flex-col">
              <Link
                  href="/"
                  class={location.url.pathname === "/" ? navItemActive : navItem}
              >
                <div>Home</div>
              </Link>
              {categories.value?.map((category) => (
                  <Link
                      class={
                        location.url.pathname === `/categories/${category.id}/`
                            ? navItemActive
                            : navItem
                      }
                      href={`/categories/${category.id}`}
                      key={category.id}
                  >
                    <div>{category.name}</div>
                  </Link>
              ))}
            </div>
            <div>
              <Slot/>
            </div>
          </div>
        </main>
      </>
  );
});
