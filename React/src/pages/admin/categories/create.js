import React, { useState } from 'react';
import axios from 'axios';
export default function CreateCategories() {
    
    const API_URL = "http://localhost:8080/api/categorias"
    
    const [category, setCategory] = useState({
        description: "",
        type: ""
    });


    const handleChange = (event) => {
       const {name, value} = event.target;
       setCategory({
        ...category,
        [name]: value
       })
    };

    const handleCreateCategory = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, {category})
            alert(response.data.message);
            window.location.href = '/admin/categories';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin/categories" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <span className="text-2xl font-bold">Cadastro de Categorias</span>

            <form onSubmit={handleCreateCategory} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        name='description'
                        value={category.description}
                        onChange={handleChange}
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
                    <select
                        id="type"
                        name='type'
                        value={category.type}
                        onChange={handleChange}
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    >
                        <option value={""}>--Selecione--</option>
                        <option value="Receita">Receita</option>
                        <option value="Despesa">Despesa</option>
                    </select>
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
};