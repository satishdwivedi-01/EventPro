import { NavLink } from "react-router-dom"
const Nav = () => {
  return (
    <nav className="h-[7vh]  flex justify-between items-center bg-white text-gray-100 sticky top-0">
      <h1 className="m-3 mx-20 font-bold text-2xl flex items-center">
        <img
          src="/event.png"
          height={40}
          width={40}
          className=" rounded-full scale-75"
        />{" "}
        <span className="text-blue-500 italic">Event</span>{" "}
        <span className="text-blue-400">pro</span>
      </h1>

      <ul className="flex gap-6 items-center mx-8 m-3 p-2">
        <NavLink to="/Login">
          <li className="cursor-pointer  border text-center border-blue-800 bg-white text-blue-800 font-bold text-sm px-9 py-1 rounded-md hover:bg-gray-100">
            Log in
          </li>
        </NavLink>
        <NavLink to="/adminLogin">
          <li className="cursor-pointer text-center bg-blue-700 font-bold text-sm px-9 py-1 rounded-md hover:bg-blue-800">
            Admin Login
          </li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default Nav