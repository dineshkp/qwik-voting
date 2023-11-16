import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {useAuthSession, useAuthSignin, useAuthSignout} from "~/routes/plugin@auth";

export default component$(() => {
  const session = useAuthSession();
  const signIn = useAuthSignin();
  const signOut = useAuthSignout();

  return (
    <>
      <div>Email: {session.value ? session.value.user?.email : 'Not signed in' }</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Voting",
  meta: [],
};
