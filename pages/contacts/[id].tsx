import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import AppMenu from "@/components/Menu/menu";

const inter = Inter({ subsets: ["latin"] });

export default function Contact() {
  const router = useRouter();

  const id = router.query.id;

  return (
    <>
      <AppMenu></AppMenu>
      <h1 className="text-3xl font-bold underline">Concats {id}</h1>
    </>
  );
}
