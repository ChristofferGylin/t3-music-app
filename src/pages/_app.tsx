import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/Header/Header";
import Context from "~/context";
import Wrapper from "~/components/Wrapper";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Context>
      <SessionProvider session={session}>
        <Wrapper>
          <Header />
          <Component {...pageProps} />
        </Wrapper>
      </SessionProvider>
    </Context>
  );
};

export default api.withTRPC(MyApp);
