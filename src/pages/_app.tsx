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
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta name="apple-mobile-web-app-title" content="PlinkPlonk"></meta>
          <link rel="apple-touch-icon" href="/plinkplonk-logo.png"></link>
          <meta name="apple-touch-fullscreen" content="yes"></meta>
          <meta
            name="apple-touch-startup-image"
            content="/plinkplonk-logo.png"
          ></meta>
          <meta name="mobile-web-app-capable" content="yes"></meta>
        </Head>
        <Wrapper>
          <Header />
          <Component {...pageProps} />
        </Wrapper>
      </SessionProvider>
    </Context>
  );
};

export default api.withTRPC(MyApp);
