import React, {useEffect, useState} from "react";
import Router from "next/router";
import HeadAdm from "@/components/HeadAdm";
import axios from "axios";
import UserAction from "@/components/UserAction";
import Head from "next/head";
export default function users() {
    const API_URL = "http://localhost:8080/api/usuarios"
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
          try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
          } catch (error) {
            console.error('Erro ao buscar os usuários:', error);
          }
        };
    
        getAllUsers();
    
      }, []);
      
      return (
        <div className="min-h-screen bg-gray-100">
            <Head><title>Lista de Usuários</title></Head>
            <HeadAdm></HeadAdm>
        <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[30px]">Lista De Usuários</h1>
        <button onClick={() => Router.push("/admin/users/create")} className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="button" placeholder="Criar Usuario">Criar Usuario</button>

        <table>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Nível</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody id="listaUsuarios">
                    {users.map( user => (
            <tr className="bg-gray-300" key={user._id}>
              <td className="p-2 border-solid border-2 border-gray-400">{user.name}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{user.email}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{user.user}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{user.level}</td>
              <td className="p-2 border-solid border-2 border-gray-400">{user.status}</td>
              <td className="p-2 border-solid border-2 border-gray-400">
              <UserAction pid={ user._id }></UserAction>
              </td>
            </tr>
        ))}
                </tbody>
            </table>
        </div>
        </div>
      )
}