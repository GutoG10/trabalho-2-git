import { useState, useEffect } from 'react';
import axios from 'axios';
export default function CreateAccounts() {
    
    const API_URL = "http://localhost:8080/api/contas"
    
    const [account, setAccount] = useState({
        description: "",
        comment: ""
    });

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setAccount({
            ...account,
            [name]: value
        })
    }

    const handleCreateAccount = async () => {
        try {
            const response = await axios.post(API_URL, {account})
            alert(response.data.message);
            window.location.href = '/admin/accounts';
        } catch (error) {
            console.error("Erro ao criar Conta: ", error);
        }
    }
    return (
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin/accounts" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <span className="text-2xl font-bold">Cadastro de Contas</span>

            <form onSubmit={handleCreateAccount} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <input
                    type='text'
                    name='description'
                    id='description'
                    required
                    onChange={handleChange}
                    value={account.description}
                    className='border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comentário:</label>
                    <input
                        type="text"
                        id="comment"
                        name='comment'
                        value={account.comment}
                        onChange={handleChange}
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}