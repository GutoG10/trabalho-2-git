import React from "react";

export default function EntriesCreate(){



return(
<body class="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            
            <a href="/admin/home" className="text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>
            <h1 class="text-3xl font-bold text-center mb-8">Cadastro de Lançamentos</h1>

<form class="max-w-lg mx-auto bg-white p-6 rounded shadow-lg">

    <div class="mb-4">
        <label for="tipo" class="block text-sm font-medium text-gray-700">Tipo:</label>
        <select name="tipo" id="tipo" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
        </select>
    </div>

    <div class="mb-4">
        <label for="categoria" class="block text-sm font-medium text-gray-700">Categoria:</label>
        <select name="categoria" id="categoria" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
        </select>
    </div>

    <div class="mb-4">
        <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição:</label>
        <input type="text" name="descricao" id="descricao" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
    </div>

    <div class="mb-4">
        <label for="valor" class="block text-sm font-medium text-gray-700">Valor:</label>
        <input type="text" name="valor" id="valor" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
    </div>

    <div class="mb-4">
        <label for="data_pagamento" class="block text-sm font-medium text-gray-700">Data de Pagamento:</label>
        <input type="date" name="data_pagamento" id="data_pagamento" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <div class="mb-4">
        <label for="data_vencimento" class="block text-sm font-medium text-gray-700">Data de Vencimento:</label>
        <input type="date" name="data_vencimento" id="data_vencimento" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
    </div>

    <div class="mb-4">
        <label for="conta_relacionada" class="block text-sm font-medium text-gray-700">Conta Relacionada:</label>
        <select name="conta_relacionada" id="conta_relacionada" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </select>
    </div>

    <div class="mb-4">
        <label for="status" class="block text-sm font-medium text-gray-700">Status:</label>
        <select name="status" id="status" class="border-solid border-2 border-gray-500 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="Lançada">Lançada</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Paga">Paga</option>
            <option value="Cancelada">Cancelada</option>
        </select>
    </div>

    <div class="flex justify-end">
        <button id="botaoAdicionar" type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Adicionar</button>
        <button id="botaoEditar" type="button" class="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none">Editar</button>
    </div>

</form>

<table id="lancamentosTable" class="mt-8 w-full bg-white rounded shadow-lg">
    <thead>
        <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Pagamento</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Vencimento</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conta Relacionada</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
        </tr>
    </thead>
    <tbody id="tabelaLancamentos">
    </tbody>
</table>

</body>
    )
}