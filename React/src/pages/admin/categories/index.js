import React, {useEffect, useState} from "react";
import Router from "next/router";
import HeadAdm from "@/components/HeadAdm";
import axios from "axios";
import CategoryAction from "@/components/CategoryAction";
import Head from "next/head";
export default function users() {
    
    const API_URL = "http://localhost:8080/api/categorias"
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getAllCategories = async () => {
          try {
            const response = await axios.get(API_URL);
            setCategories(response.data);
          } catch (error) {
            console.error('Erro ao buscar os usuários:', error);
          }
        };
    
        getAllCategories();
    
      }, []);
      
      return (
        <div className="min-h-screen bg-gray-100">
            <Head><title>Lista de Categorias</title></Head>
            <HeadAdm></HeadAdm>
        <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[30px]">Lista De Categorias</h1>
        <button onClick={() => Router.push("/admin/categories/create")} className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="button" placeholder="Criar Usuario">Criar Categoria</button>

        <table>
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="px-[50px] py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody id="listaCategorias">
                    {categories.map( category => (
            <tr className="bg-gray-300" key={category._id}>
              <td className="text-center p-2 border-solid border-2 border-gray-400">{category.description}</td>
              <td className="text-center p-2 border-solid border-2 border-gray-400">{category.type}</td>
              <td className="text-center p-2 border-solid border-2 border-gray-400">
              <CategoryAction pid={ category._id }></CategoryAction>
              </td>
            </tr>
        ))}
                </tbody>
            </table>
        </div>
        </div>
      )
}