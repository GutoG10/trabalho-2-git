import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', {
                email: usuario,
                senha: senha
            });
            console.log(response.data);
            if (response.data.success) {
                Router.push('/admin')
                // Redirecionar ou executar outras ações após login bem-sucedido
            } else {
                alert("Credenciais inválidas!");
            }
        } catch (error) {
            console.error("Erro durante a tentativa de login:", error);
            alert("Erro durante a tentativa de login.");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={usuario}
                        onChange={handleUsuarioChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={senha}
                        onChange={handleSenhaChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
