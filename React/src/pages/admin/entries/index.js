import React, {useEffect, useState} from "react";
import Router from "next/router";
import HeadAdm from "@/components/HeadAdm";
import axios from "axios";
import Head from "next/head";
import EntryAction from "@/components/EntryAction";
export default function entries() {
    
  
  const API_URL = "http://localhost:8080/api/lancamentos"
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const getAllEntries = async () => {
          try {
            const response = await axios.get(API_URL);
            setEntries(response.data);
          } catch (error) {
            console.error('Erro ao buscar os usuários:', error);
          }
        };
    
        getAllEntries();
    
      }, []);

      return(
        <div className="min-h-screen bg-gray-100">
            <Head><title>Lista de Lançamentos</title></Head>
            <HeadAdm></HeadAdm>
        <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[30px]">Lista De Lançamentos</h1>
        <button onClick={() => Router.push("/admin/entries/create")} className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="button" placeholder="Criar Usuario">Criar Lançamento</button>


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
                {entries.map( entry => (
            <tr className="bg-gray-300" key={entry._id}>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.type}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.category}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.description}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.value}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.payment_date}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.due_date}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.account}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{entry.status}</td>
              <td className="p-2 border-solid border-2 border-gray-400">
                <EntryAction pid={ entry._id }></EntryAction>
              </td>
            </tr>
        ))}
                </tbody>
            </table>
        </div>
        </div>
      )
}