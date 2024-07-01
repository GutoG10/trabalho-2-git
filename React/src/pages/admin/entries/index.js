import React, { useEffect, useState } from "react";
import Router from "next/router";
import HeadAdm from "@/components/HeadAdm";
import axios from "axios";
import Head from "next/head";
import EntryAction from "@/components/EntryAction";
import EntriesList from "@/components/EntriesList";

export default function Entries() {
  const API_URL = "http://localhost:8080/api/lancamentos";
  const [entries, setEntries] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [accountMap, setAccountMap] = useState({});

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const response = await axios.get(API_URL);
        const updatedEntries = response.data.map(entry => ({
          ...entry,
          type: categoryMap[entry.category] ? categoryMap[entry.category].type : ""
        }));
        setEntries(updatedEntries);
      } catch (error) {
        console.error('Erro ao buscar os lançamentos:', error);
      }
    };

    const getAllCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categorias");
        const categoryMap = response.data.reduce((map, category) => {
          map[category._id] = category;
          return map;
        }, {});
        setCategoryMap(categoryMap);
      } catch (error) {
        console.error("Erro ao buscar as categorias:", error);
      }
    };

    const getAllAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/contas");
        const accountMap = response.data.reduce((map, account) => {
          map[account._id] = account.description;
          return map;
        }, {});
        setAccountMap(accountMap);
      } catch (error) {
        console.error("Erro ao buscar as contas:", error);
      }
    };

    getAllCategories();
    getAllAccounts();
    getAllEntries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head><title>Lista de Lançamentos</title></Head>
      <HeadAdm></HeadAdm>
      <EntriesList></EntriesList>
    </div>
  );
}
