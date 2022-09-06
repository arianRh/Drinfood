import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

const queryClient = new QueryClient();

export const idContext = createContext({
  idHolder: [""],
  setIdHolder: ([]) => console.log(),
});

interface NumberType {
  idHolder?: string[];
  setIdHolder?: (e: string[]) => void;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [idHolder, setIdHolder] = useState<string[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <idContext.Provider value={{ idHolder, setIdHolder }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </idContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
