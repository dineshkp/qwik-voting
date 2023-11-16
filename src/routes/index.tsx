import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import prismaClient from "~/lib/prismaClient";

export const useCategories = routeLoader$(async() => {
  return await prismaClient.category.findMany();
})

export default component$(() => {
  const categories = useCategories();

  return (
    <>

    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Voting",
  meta: [],
};
