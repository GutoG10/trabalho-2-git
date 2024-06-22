import React from "react";
import Router from "next/router";

export default function Admin() {

    function usersCreate(){
        Router.push("/admin/users/create")
    }

    return (
        <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex">
              <button onClick={() => { Router.push("/admin/categories/create")}} className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Categorias
              </button>
              <button onClick={() => { Router.push("/admin/accounts/create")}} className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Contas
              </button>
              <button onClick={() => { Router.push("/admin/entries/create")}} className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Lançamentos
              </button>
              <button onClick={() => { Router.push("/admin/users/create")}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Usuários
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        
      </main>
    </div>
    )
}