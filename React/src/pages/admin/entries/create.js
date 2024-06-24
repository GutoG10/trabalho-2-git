import React from "react";

export default function EntriesCreate(){



return(
<div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <span className="text-2xl font-bold">Cadastro de Lançamentos</span>

            <form action="/addLancamento" method="POST" className="mt-4">
                <div className="mb-4">
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
                    <select
                        id="tipo"
                        name="tipo"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="Receita">Receita</option>
                        <option value="Despesa">Despesa</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria:</label>
                    <select
                        id="categoria"
                        name="categoria"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    >
                        {/* Opções de categoria seriam adicionadas dinamicamente aqui, se necessário */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor:</label>
                    <input
                        type="text"
                        id="valor"
                        name="valor"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="data_pagamento" className="block text-sm font-medium text-gray-700">Data de Pagamento:</label>
                    <input
                        type="date"
                        id="data_pagamento"
                        name="data_pagamento"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="data_vencimento" className="block text-sm font-medium text-gray-700">Data de Vencimento:</label>
                    <input
                        type="date"
                        id="data_vencimento"
                        name="data_vencimento"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="conta_relacionada" className="block text-sm font-medium text-gray-700">Conta Relacionada:</label>
                    <select
                        id="conta_relacionada"
                        name="conta_relacionada"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        {/* Opções de conta relacionada seriam adicionadas dinamicamente aqui, se necessário */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        id="status"
                        name="status"
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
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

                <button
                    id="botaoEditar"
                    type="button"
                    onClick={() => {
                        // Lógica para editar, se necessário
                        console.log('Editar');
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                >
                    Editar
                </button>
            </form>

            <h1 className="text-2xl font-bold mt-8 mb-4">Lançamentos</h1>

            <table className="flex justify-center w-full bg-white rounded shadow-lg">
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
                    {/* Aqui as linhas serão adicionadas dinamicamente pelo JavaScript */}
                </tbody>
            </table>
        </div>
   
    )
}