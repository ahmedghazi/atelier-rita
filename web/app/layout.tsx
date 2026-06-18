import "./styles/index.scss";
import "./global.css";
import Header from "./components/Header";
import website from "./config/website";
import { PageContextProvider } from "./context/PageContext";
import { getSettings } from "./sanity-api/sanity-queries";
import { LocaleContextProvider } from "./context/LocaleContext";
import { draftMode } from "next/headers";
import VisualEditingClient from "./components/VisualEditingClient";
import Gridder from "./components/ui/Gridder";
import localFont from "next/font/local";

const selecta = localFont({
  // src: './styles/fonts/Selecta-Medium.woff2',
  variable: "--font-primary",
  src: [
    {
      path: "./styles/fonts/Selecta-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./styles/fonts/Selecta-Medium-Italic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
});

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const { isEnabled } = await draftMode();
  // const { colors } = settings || {};

  return (
    <html lang='fr'>
      <body
        className={["is-loading", selecta.className].join(" ")}
        data-theme='theme-xyz'>
        <div id='page'>
          <LocaleContextProvider>
            <PageContextProvider settings={settings}>
              <Gridder />
              <Header settings={settings} />
              {/* <DesignSystem /> */}
              <main>{children}</main>
              {/* <Footer settings={settings} /> */}
              {isEnabled && <VisualEditingClient />}
            </PageContextProvider>
          </LocaleContextProvider>
        </div>
      </body>
    </html>
  );
}
