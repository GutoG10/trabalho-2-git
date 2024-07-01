import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";

export default function EntriesCreate() {
  const API_URL = "http://localhost:8080/api/lancamentos/";

  const [category, setCategory] = useState([]);
  const [account, setAccount] = useState([]);
  const [entries, setEntries] = useState({
    category: "",
    description: "",
    value: "",
    payment_date: "",
    due_date: "",
    account: "",
    status: "",
  });
  const [type, setType] = useState({
    type: "",
  });

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categorias"
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Erro ao buscar as categorias:", error);
      }
    };
    const getAllAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/contas");
        setAccount(response.data);
      } catch (error) {
        console.error("Erro ao buscar as contas:", error);
      }
    };

    getAllCategories();
    getAllAccounts();
    console.log(category);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntries({
      ...entries,
      [name]: value,
    });
  };

  const handleTypeChange = (event) => {
    const valido = true;
    const { name, value } = event.target;
    setType({ ...type, [name]: value });
  };

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    if (entries.status === "Paga" || entries.payment_date === "") {
      alert(
        "Para um lançamento estar pago, ele precisa de uma data de pagamento"
      );
    }
    else {
      try {
        const response = await axios.post(API_URL, { entries });
        alert(response.data.message);
        window.location.href = "/admin/entries";
      } catch (error) {
        console.error("Erro ao criar o lançamento:", error);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
      <Head>
        <title>Cadastro de Lançamentos</title>
      </Head>
      <a
        href="/admin/entries"
        className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Voltar
      </a>

      <span className="text-2xl font-bold">Cadastro de Lançamentos</span>

      <div className="mb-4">
        <label
          htmlFor="tipo"
          className="block text-sm font-medium text-gray-700"
        >
          Tipo:
        </label>
        <select
          id="type"
          name="type"
          value={type.type}
          onChange={handleTypeChange}
          className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value={""}>--Selecione--</option>
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </select>
      </div>

      <form onSubmit={handleCreateEntry} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria:
          </label>
          <select
            id="category"
            name="category"
            value={entries.category}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value={""}>--Selecione--</option>
            {category
              .filter((categories) => categories.type === type.type)
              .map((filteredCategory) => (
                <option key={filteredCategory._id} value={filteredCategory._id}>
                  {filteredCategory.description}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={entries.description}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="valor"
            className="block text-sm font-medium text-gray-700"
          >
            Valor:
          </label>
          <input
            type="text"
            id="value"
            name="value"
            value={entries.value}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="data_pagamento"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Pagamento:
          </label>
          <input
            type="date"
            id="payment_date"
            name="payment_date"
            value={entries.payment_date}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="data_vencimento"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Vencimento:
          </label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={entries.due_date}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="account"
            className="block text-sm font-medium text-gray-700"
          >
            Conta Relacionada:
          </label>
          <select
            id="account"
            name="account"
            value={entries.account}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value={""}>--Selecione--</option>
            {account.map((account) => (
              <option key={account.id} value={account._id}>
                {account.description}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={entries.status}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value={""}>--Selecione--</option>
            <option value="Lançada">Lançada</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Paga">Paga</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <button
          id="botaoAdicionar"
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}
