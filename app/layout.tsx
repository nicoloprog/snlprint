import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Permanent_Marker } from "next/font/google";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: ["400"],
});

const storyScript = localFont({
  src: [
    {
      path: "../public/fonts/StoryScript-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-story-script",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html
      lang="en"
      className={`${permanentMarker.variable}  ${storyScript.variable}`}
    >
      <body
        className={`bg-neutral-50 text-black selection:bg-teal-300 dark:bg-black dark:text-white dark:selection:bg-purple-500 dark:selection:text-white `}
      >
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
