"use client"
import React from "react";
import HeadAdm from "@/components/HeadAdm";
import Head from "next/head";

export default function admin() {

    return (
        
          <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Admin Home</title>
            </Head>
          <HeadAdm></HeadAdm>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        
      </main>
    </div>
    )
}