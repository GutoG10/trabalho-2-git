import Link from "next/link";
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Axios from "axios";

export default function ReadAccount(){
    
    const API_URL = "http://localhost:8080/api/contas/";

  
    const [account, setAccount] = useState({
      description: "",
      comment: "",
    });
  
    const router = useRouter();
    const [pid] = useState(router.query.pid);
    console.log(pid)


     useEffect(() => {
        const getAccount = async () => {
          try {
            const response = await Axios.get(API_URL + pid);
            console.log(response.data)
            setAccount(response.data);
          } catch (error) {
            console.error('Erro ao buscar a conta:', error);
          }
        };
    
        getAccount();
    
      }, []);
  
    
    
    return(
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin/accounts" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <h1 className="text-3xl font-bold mb-8">Visualização da conta</h1>

            <form>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 ">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        value={account.description}
                        readOnly
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Comentário:</label>
                    <input
                        type="text"
                        id="comment"
                        value={account.comment}
                        readOnly
                        className=" border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <Link href={"/admin/accounts"}>
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