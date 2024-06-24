import Link from "next/link";

export default function AccountAction(props) {
    return (
        <>
            <Link className="m-0.5 p-1 bg-sky-600 rounded text-white btn btn-outline-success btn-sm hover:bg-sky-800" href={`/admin/accounts/read/${ props.pid }`}>Visualizar</Link>
            <Link className="m-0.5 p-1 bg-green-600 rounded text-white btn btn-outline-success btn-sm hover:bg-green-800" href={`/admin/accounts/update/${ props.pid }`}>Editar</Link>
            <Link className="m-0.5 p-1 bg-red-600 rounded text-white btn btn-outline-success btn-sm hover:bg-red-800" href={`/admin/accounts/delete/${ props.pid }`}>Deletar</Link>
        </>
    )
}