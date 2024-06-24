import React, {useEffect, useState} from "react";
import Router from "next/router";
import HeadAdm from "@/components/HeadAdm";
import axios from "axios";
import AccountAction from "@/components/AccountAction";
import Head from "next/head";
export default function users() {
    
    const API_URL = "http://localhost:8080/api/contas"
    const [accounts, setAccount] = useState([]);

    useEffect(() => {
        const getAllAccounts = async () => {
          try {
            const response = await axios.get(API_URL);
            setAccount(response.data);
          } catch (error) {
            console.error('Erro ao buscar os Contas:', error);
          }
        };
    
        getAllAccounts();
    
      }, []);
      
      return (
        <div className="min-h-screen bg-gray-100">
            <Head><title>Lista de Contas</title></Head>
            <HeadAdm></HeadAdm>
        <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[30px]">Lista De Contas</h1>
        <button onClick={() => Router.push("/admin/accounts/create")} className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="button" placeholder="Criar Usuario">Criar Conta</button>
            <table className="mt-3 bg-white rounded shadow-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Comentários</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody id="listagemContas">
                    {accounts.map( account => (
            <tr className="bg-gray-300" key={account._id}>
              <td className="text-center p-2 border-solid border-2 border-gray-400">{account.description}</td>
              <td className="text-center p-2 border-solid border-2 border-gray-400">{account.comment}</td>
              <td className="text-center p-2 border-solid border-2 border-gray-400">
              <AccountAction pid={ account._id }></AccountAction>
              </td>
            </tr>
        ))}
                </tbody>
            </table>
        </div>
        </div>
      )
}