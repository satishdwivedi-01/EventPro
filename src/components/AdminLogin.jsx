import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
    const navigate = useNavigate()

    const [LogininputValues, setLogininputValues] = useState({ "fullUserName": '', "email": '' })

    const handleInput = (e) => {
        setLogininputValues({ ...LogininputValues, [e.target.name]: e.target.value })
    }

    const handleLogin = () => {
        if ( LogininputValues.fullUserName.toLowerCase() === "satish dwivedi" && LogininputValues.email === "dwivedisatish06@gmail.com") {
            navigate('/admin')
        }
    }
    return (
        <div className="mt-[15vh]  flex  justify-center">
            <div className="container w-[60vw] bg-gray-50 rounded-lg p-8 flex flex-col border-2 border-r-1 border-blue-100">
                <h1 className="m-3 mx-auto font-bold text-2xl flex items-center text-center">
                    <img
                        src="/event.png"
                        height={40}
                        width={40}
                        className=" rounded-full scale-75"
                    />{" "}
                    <span className="text-blue-500 italic">Event</span>{" "}
                    <span className="text-blue-400">pro</span>
                </h1>
                <h2 className="text-gray-600 text-lg font-medium title-font mb-5">Admin Login</h2>
                <div className="relative mb-4">
                    <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                    <input onChange={handleInput} type="text" id="full-name" name="fullUserName" value={LogininputValues.fullUserName} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input onChange={handleInput} type="email" id="email" name="email" value={LogininputValues.email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button onClick={handleLogin} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                <p  className="text-blue-600 text-sm mt-5">are you an user? 
                <NavLink to="/SignUp" >
                        <span className="cursor-pointer underline underline-offset-2 font-medium"> Sign up</span>
                </NavLink>
                </p>
            </div>
        </div>
    )
}

export default AdminLogin