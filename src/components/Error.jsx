const Error = ({mensaje}) => {
    return (
        <div className="bg-red-800 text-white p-3 rounded-md mb-5 font-bold text-center">
            <p>{mensaje}</p>
        </div>
    )
}

export default Error