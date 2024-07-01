import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function UpdateEntry() {
  const API_URL = "http://localhost:8080/api/lancamentos/";

  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [entry, setEntry] = useState({
    category: "",
    description: "",
    value: "",
    payment_date: "",
    due_date: "",
    account: "",
    status: "",
  });
  const [type, setType] = useState("");

  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, accountsResponse, entryResponse] = await Promise.all([
          Axios.get("http://localhost:8080/api/categorias"),
          Axios.get("http://localhost:8080/api/contas"),
          Axios.get(API_URL + pid),
        ]);
        setCategories(categoriesResponse.data);
        setAccounts(accountsResponse.data);
        setEntry(entryResponse.data);
        
        // Encontrar a categoria correspondente ao ID do entry e definir o tipo
        const foundCategory = categoriesResponse.data.find(cat => cat._id === entryResponse.data.category);
        if (foundCategory) {
          setType(foundCategory.type);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (pid) {
      fetchData();
    }
  }, [pid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "type") {
      setType(value);
      setEntry({
        ...entry,
        category: "", // Resetar a categoria ao mudar o tipo para garantir que a categoria seja filtrada corretamente
      });
    } else {
      setEntry({
        ...entry,
        [name]: value,
      });
    }
  };

  const handleUpdateEntry = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.put(API_URL + pid, {entry});
      alert(response.data.message);
      router.push("/admin/entries");
    } catch (error) {
      console.error("Erro ao editar o lançamento:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
      <a
        href="/admin/entries"
        className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Voltar
      </a>

      <h1 className="text-3xl font-bold mb-8">Edição do lançamento</h1>

      <form onSubmit={handleUpdateEntry} className="mt-4">

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo:
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value={""}>--Selecione--</option>
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria:
          </label>
          <select
            id="category"
            name="category"
            value={entry.category}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value={""}>--Selecione--</option>
            {categories
              .filter((cat) => cat.type === type)
              .map((filteredCategory) => (
                <option
                  key={filteredCategory._id}
                  value={filteredCategory._id}
                >
                  {filteredCategory.description}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={entry.description}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="value"
            className="block text-sm font-medium text-gray-700"
          >
            Valor:
          </label>
          <input
            type="text"
            id="value"
            name="value"
            value={entry.value}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="payment_date"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Pagamento:
          </label>
          <input
            type="date"
            id="payment_date"
            name="payment_date"
            value={entry.payment_date}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="due_date"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Vencimento:
          </label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={entry.due_date}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="account"
            className="block text-sm font-medium text-gray-700"
          >
            Conta Relacionada:
          </label>
          <select
            id="account"
            name="account"
            value={entry.account}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value={""}>--Selecione--</option>
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.description}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={entry.status}
            onChange={handleChange}
            className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value={""}>--Selecione--</option>
            <option value="Lançada">Lançada</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Paga">Paga</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <Link href={"/admin/entries"}>
          <button
            id="botaoVoltar"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Voltar
          </button>
        </Link>
        <button
          id="botaoEditar"
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Editar
        </button>
      </form>
    </div>
  );
}
