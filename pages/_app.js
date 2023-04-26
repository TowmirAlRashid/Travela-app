import "@/styles/globals.css";
import TopLayout from "@/layouts/TopLayout";

import AppContext from "@/AppContext";

export default function App({ Component, pageProps }) {
  return (
    <AppContext.Provider value={pageProps.primaryContact}>
      <TopLayout>
        <Component {...pageProps} />
      </TopLayout>
    </AppContext.Provider>
  );
}
