import Link from "next/link";
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Axios from "axios";

export default function DeleteCategory(){
    
    const API_URL = "http://localhost:8080/api/categorias/";

  
    const [category, setCategory] = useState({
      description: "",
      type: "",
    });
  
    const router = useRouter();
    const [pid] = useState(router.query.pid);
    console.log(pid)


     useEffect(() => {
        const getCategory = async () => {
          try {
            const response = await Axios.get(API_URL + pid);
            console.log(response.data)
            setCategory(response.data);
          } catch (error) {
            console.error('Erro ao buscar a categoria:', error);
          }
        };
    
        getCategory();
    
      }, []);

      const handleDeleteCategory = async () => {
        console.log(pid);
        try {
          const response = await Axios.put(API_URL + pid, {
            category: {
              description: "Deletado",
              type: category.type // mantenha o tipo atual da categoria
            }
          });
          alert(response.data.message);
          window.location.href = '/admin/categories';
        } catch (error) {
          console.error('Erro ao deletar a categoria:', error);
        }
      };
      
  
    
    
    return(
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin/categories" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <h1 className="text-3xl font-bold mb-8">Exclusão da categoria</h1>

            <form>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 ">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        value={category.description}
                        readOnly
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo:</label>
                    <input
                        type="text"
                        id="type"
                        value={category.type}
                        readOnly
                        className=" border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <Link href={"/admin/categories"}>
                <button
                    id="botaoVoltar"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Voltar
                </button>
                </Link>
                <button
                    id="botaoDeletar"
                    className=" bg-red-600 rounded text-white px-4 py-2 hover:bg-red-800 focus:outline-none focus:bg-red-800"
                    onClick={handleDeleteCategory}>
                    Deletar
                </button>

            </form>
        </div>
    )
}