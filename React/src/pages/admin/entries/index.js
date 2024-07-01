import React from "react";
import HeadAdm from "@/components/HeadAdm";
import Head from "next/head";
import EntriesList from "@/components/EntriesList";

export default function Entries() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head><title>Lista de Lançamentos</title></Head>
      <HeadAdm></HeadAdm>
      <EntriesList></EntriesList>
    </div>
  );
}
