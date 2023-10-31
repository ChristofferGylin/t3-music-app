import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/Header";
import Context from "~/context";
import MainContainer from "~/components/MainContainer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Context>
      <SessionProvider session={session}>
        <MainContainer>
          <Header />
          <Component {...pageProps} />
        </MainContainer>
      </SessionProvider>
    </Context>
  );
};

export default api.withTRPC(MyApp);
