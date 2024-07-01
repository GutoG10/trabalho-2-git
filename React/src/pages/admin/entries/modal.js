import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const AdminEntriesPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [entries, setEntries] = useState([]);
    const API_URL = "http://localhost:8080/api/lancamentos";

    useEffect(() => {
        const getEntry = async () => {
            try {
                const response = await Axios.get(API_URL);
                console.log(response.data);
                setEntries(response.data);
            } catch (error) {
                console.error('Erro ao buscar o lançamento:', error);
            }
        };

        const modalCookie = Cookies.get('showModal');
        if (modalCookie === 'true') {
            setShowModal(true);
            Cookies.remove('showModal');
        }

        getEntry();
    }, []);

    const hoje = new Date().toISOString().split("T")[0];
    const lancamentosVencidos = entries.filter((entry) => entry.due_date < hoje && entry.payment_date == "");
    const lancamentosDeHoje = entries.filter((entry) => entry.due_date == hoje);

    return (
        <div>
            {showModal && (
                <div className="modal fixed z-[1] left-[250px] top-0 w-full h-full overflow-auto">
                    <div className="content bg-slate-400 m-[15%] p-5 rounded w-[500px] flex flex-col items-center">
                        <h1>Recado de Lançamentos Vencidos</h1>
                        <div>
                            {lancamentosVencidos.map((vencimento, index) => (
                                <p key={index}>{"Seu lançamento: " + vencimento.description + " venceu em: " + vencimento.due_date}</p>
                            ))}
                            {lancamentosDeHoje.map((vencimento, index) => (
                                <p key={index}>{"Seu lançamento: " + vencimento.description + " vencerá hoje!"}</p>
                            ))}
                        </div>
                        <button className="mt-2 border-solid border-[2px] border-red-600 rounded p-1 bg-red-600 text-white" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEntriesPage;
