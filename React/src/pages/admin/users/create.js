import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';

export default function CreateUsers() {

    const API_URL = "http://localhost:8080/api/usuarios/"

    const [user, setUser] = useState({
        name: "",
        email: "",
        user: "",
        pwd: "",
        level: "",
        status: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleCreateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_URL, { user });
            alert(response.data.message);
            window.location.href = '/admin/users';
        } catch (error) {
            console.error('Erro ao criar o Usuário:', error);
        }
    };


    return (
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <Head>
                <title>Cadastrar Usuário</title>
            </Head>
            <a href="/admin/users" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <h1 className="text-3xl font-bold mb-8">Cadastro de Usuários</h1>

            <form onSubmit={handleCreateUser}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuário:</label>
                    <input
                        type="text"
                        id="user"
                        name='user'
                        value={user.user}
                        onChange={handleChange}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">Senha:</label>
                    <input
                        type="password"
                        id="pwd"
                        name='pwd'
                        value={user.pwd}
                        onChange={handleChange}
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nível de Acesso:</label>
                    <select
                        id="level"
                        name='level'
                        value={user.level}
                        onChange={handleChange}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value={""}>--Selecione--</option>
                        <option value="Admin">Admin</option>
                        <option value="Usuario">Usuário</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        id="status"
                        name='status'
                        value={user.status}
                        onChange={handleChange}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value={""}>--Selecione--</option>
                        <option value={"on"}>Ativo</option>
                        <option value={"off"}>Inativo</option>
                    </select>
                </div>
                <button
                    id="botaoAdicionar"
                    type='submit'
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
