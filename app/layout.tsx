import type {Metadata} from "next";
import {ReactNode} from "react";
import "@/shared/styles/main.css"
import {Nunito} from 'next/font/google';
import {cn} from "@/shared/lib/utils";
import {Footer, Header} from "@/shared/components";

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['500', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: "Game Drop | Главная",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
      <html lang="en">
      <body className={cn(nunito.variable)}>
      <Header/>
      {children}
      <Footer/>
      </body>
      </html>
  );
}