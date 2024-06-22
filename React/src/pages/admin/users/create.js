import { useState } from 'react';

export default function CreateUsers() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [level, setLevel] = useState('Admin');
    const [status, setStatus] = useState('on');
    const [comments, setComments] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode implementar o código para enviar os dados do formulário
        console.log({
            name,
            email,
            user,
            pwd,
            level,
            status,
            comments
        });
        // Limpar os campos após o envio
        clearForm();
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setUser('');
        setPwd('');
        setLevel('Admin');
        setStatus('on');
        setComments('');
    };

    return (
        <div className="container mx-auto max-w-3xl bg-white p-6 rounded shadow-lg border-solid border-2 border-gray-300">
            <a href="/admin/home" className="flex items-center text-gray-700 hover:text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
            </a>

            <h1 className="text-3xl font-bold mb-8">Cadastro de Usuários</h1>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className=" border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuário:</label>
                    <input
                        type="text"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">Senha:</label>
                    <input
                        type="password"
                        id="pwd"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nível de Acesso:</label>
                    <select
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Usuario">Usuário</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="on">Ativo</option>
                        <option value="off">Inativo</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comentários:</label>
                    <input
                        type="text"
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="border-solid border-2 border-gray-500 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>

                <button
                    id="botaoAdicionar"
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Cadastrar
                </button>

            </form>

            <h2 className="text-2xl font-bold mt-8 mb-4">Lista de Usuários</h2>
            <ul id="userList" className="mb-8"></ul>

        </div>
    );
}