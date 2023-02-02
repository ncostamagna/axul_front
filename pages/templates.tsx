import Head from "next/head";
import { Inter } from "@next/font/google";
import AppMenu from "@/components/Menu/menu";

const inter = Inter({ subsets: ["latin"] });

export default function Templates() {
  return (
    <>
      <Head>
        <title>Templates</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppMenu></AppMenu>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}
