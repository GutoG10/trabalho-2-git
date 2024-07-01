import React, { useEffect, useState } from "react";
import HeadAdm from "@/components/HeadAdm";
import Head from "next/head";
import EntriesList from "@/components/EntriesList";

export default function Entries() {
  // Defina as datas de início e fim aqui (por exemplo)
  const startDate = "2024-01-01"; // data de início
  const endDate = "2024-12-31"; // data de fim

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Lista de Lançamentos</title>
      </Head>
      <HeadAdm />
      <EntriesList startDate={startDate} endDate={endDate} />
    </div>
  );
}
