import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import EntryAction from "@/components/EntryAction";
import Router from "next/router";

const EntriesList = ({ startDate, endDate }) => {
  const API_URL = "http://localhost:8080/api/lancamentos";
  const [entries, setEntries] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [accountMap, setAccountMap] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(API_URL);
        // Filtra os lançamentos com base nas datas de vencimento
        const filteredEntries = response.data.filter(entry => {
          const dueDate = new Date(entry.due_date);
          return dueDate >= new Date(startDate) && dueDate <= new Date(endDate);
        });

        // Ordena os lançamentos filtrados pela data de vencimento (due_date)
        const sortedEntries = filteredEntries.sort((a, b) => {
          if (a.due_date < b.due_date) return -1;
          if (a.due_date > b.due_date) return 1;
          return 0;
        });

        const updatedEntries = sortedEntries.map((entry) => ({
          ...entry,
          type: categoryMap[entry.category] ? categoryMap[entry.category].type : "",
        }));

        setEntries(updatedEntries);
      } catch (error) {
        console.error("Erro ao buscar os lançamentos:", error);
      }
    };

    const fetchCategories = async () => {
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

    const fetchAccounts = async () => {
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

    fetchCategories();
    fetchAccounts();
    fetchEntries();
  }, [startDate, endDate]);

  // Calcula o valor total com base na categoria de lançamento (receita ou despesa)
  useEffect(() => {
    let totalReceitas = 0;
    let totalDespesas = 0;

    entries.forEach(entry => {
      const value = parseFloat(entry.value);
      const category = categoryMap[entry.category];
      if(entry.status!= "Cancelada"){
        if (category) {
          if (category.type === "Receita") {
            totalReceitas += value;
          } else if (category.type === "Despesa") {
            totalDespesas += value;
          }
        }
      }
    });

    const total = totalReceitas - totalDespesas;
    setTotalAmount(total);
  }, [entries, categoryMap]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[30px]">Lista De Lançamentos</h1>
      <div className="mb-4">
        <p className="font-semibold">
          Valor Total: R${" "}
          {totalAmount.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <button
        onClick={() => Router.push("/admin/entries/create")}
        className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        type="button"
        placeholder="Criar Lançamento"
      >
        Criar Lançamento
      </button>

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
          {entries.map((entry) => (
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
