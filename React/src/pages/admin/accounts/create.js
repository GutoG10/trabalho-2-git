import { useState } from 'react';

export default function CreateAccounts() {
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            description,
            comments
        });

        clearForm();
    };

    const clearForm = () => {
        setDescription("");
        setComments('');
    };

    return (
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin/home" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <span className="text-2xl font-bold">Cadastro de Contas</span>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <select name="status" value={description} onChange={(e) => setDescription(e.target.value)} id="status" className=" border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="">Selecione uma opção</option>
                    <option value="Conta Corrente">Conta Poupança</option>
                    <option value="Conta Poupança">Conta Corrente</option>
        </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comentários:</label>
                    <input
                        type="text"
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                >
                    Salvar Conta
                </button>

                <button
                    type="button"
                    onClick={() => {
                        console.log('Editar');
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                >
                    Editar
                </button>
            </form>

            <h2 className="text-xl font-bold mt-8 mb-4">Lista de Contas</h2>

            <table className="w-full bg-white rounded shadow-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Comentários</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody id="listagemContas">
                </tbody>
            </table>
        </div>
    );
}