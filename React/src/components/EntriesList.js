// components/EntriesList.js

import React, { useEffect, useState } from "react";
import Router from "next/router";
import HeadAdm from "./HeadAdm";
import axios from "axios";
import Head from "next/head";
import EntryAction from "./EntryAction";

const EntriesList = () => {
  const API_URL = "http://localhost:8080/api";

  const [entries, setEntries] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [accountMap, setAccountMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entriesResponse = await axios.get(`${API_URL}/lancamentos`);
        const categoriesResponse = await axios.get(`${API_URL}/categorias`);
        const accountsResponse = await axios.get(`${API_URL}/contas`);

        const updatedEntries = entriesResponse.data.map(entry => ({
          ...entry,
          type: categoryMap[entry.category] ? categoryMap[entry.category].type : ""
        }));

        const categoryMapData = categoriesResponse.data.reduce((map, category) => {
          map[category._id] = category;
          return map;
        }, {});

        const accountMapData = accountsResponse.data.reduce((map, account) => {
          map[account._id] = account.description;
          return map;
        }, {});

        setEntries(updatedEntries);
        setCategoryMap(categoryMapData);
        setAccountMap(accountMapData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[30px]">Lista De Lançamentos</h1>
        <button onClick={() => Router.push("/admin/entries/create")} className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="button" placeholder="Criar Lançamento">Criar Lançamento</button>

        <table>
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Data de Pagamento</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Data de Vencimento</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Conta Relacionada</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody id="tabelaLancamentos">
            {entries.map(entry => (
              <tr className="bg-gray-300" key={entry._id}>
                <td className="p-2 border-solid border-2 border-gray-400">{categoryMap[entry.category] ? categoryMap[entry.category].type : ""}</td>
                <td className="p-2 border-solid border-2 border-gray-400">{categoryMap[entry.category] ? categoryMap[entry.category].description : "--Deletado--"}</td>
                <td className="p-2 border-solid border-2 border-gray-400">{entry.description}</td>
                <td className="p-2 border-solid border-2 border-gray-400">R${parseFloat(entry.value).toFixed(2)}</td>
                <td className="p-2 border-solid border-2 border-gray-400">{entry.payment_date}</td>
                <td className="p-2 border-solid border-2 border-gray-400">{entry.due_date}</td>
                <td className="p-2 border-solid border-2 border-gray-400">{accountMap[entry.account] || "--Deletado--"}</td>
                <td className="p-2 border-solid border-2 border-gray-400">{entry.status}</td>
                <td className="p-2 border-solid border-2 border-gray-400">
                  <EntryAction pid={entry._id}></EntryAction>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default EntriesList;
