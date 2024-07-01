"use client"
import React from "react";
import HeadAdm from "@/components/HeadAdm";
import Head from "next/head";
import EntriesList from "@/components/EntriesList";

export default function admin() {

  const startDate = new Date().toISOString().slice(0, 10);
  const endDate = new Date().toISOString().slice(0, 10);

    return (
        
          <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Admin Home</title>
            </Head>
          <HeadAdm></HeadAdm>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EntriesList startDate={startDate} endDate={endDate}></EntriesList>
        
      </main>
    </div>
    )
}