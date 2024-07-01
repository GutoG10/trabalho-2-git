import Link from "next/link";
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Axios from "axios";

export default function ReadUser(){
    
    const API_URL = "http://localhost:8080/api/usuarios/";

  
    const [user, setUser] = useState({
      name: "",
      email: "",
      user: "",
      pwd: "",
      level: "",
      status: ""
    });
  
    const router = useRouter();
  const [pid] = useState(router.query.pid);
console.log(pid)


     useEffect(() => {
        const getUser = async () => {
          try {
            const response = await Axios.get(API_URL + pid);
            console.log(response.data)
            setUser( response.data);
          } catch (error) {
            console.error('Erro ao buscar o usuário:', error);
          }
        };
    
        getUser();
    
      }, []);
  
    
    
    return(
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin/users" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <h1 className="text-3xl font-bold mb-8">Visualização do Usuário</h1>

            <form>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={user.name}
                        readOnly
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        readOnly
                        className=" border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuário:</label>
                    <input
                        type="text"
                        id="user"
                        value={user.user}
                        readOnly
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nível de Acesso:</label>
                    <input
                        id="level"
                        type="text"
                        value={user.level}
                        readOnly
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                    <input
                        id="status"
                        type="text"
                        value={user.status}
                        readOnly
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    
                </div>

                <Link href={"/admin/users"}>
                <button
                    id="botaoVoltar"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Voltar
                </button>
                
                </Link>

            </form>
        </div>
    )
}