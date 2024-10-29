import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const navigate=useNavigate()

    const [SignUpinputValues, setSignUpinputValues] = useState({ "fullUserName": '', "email": '' })

    const SaveToLocalStorage = ()=>{
        
        if (SignUpinputValues.email != "dwivedisatish06@gmail.com"){
            let users=JSON.parse(localStorage.getItem("AllUsers")) 
            if (users){
                let newmail =''
                users.forEach(element => {
                    if (SignUpinputValues.email === element.email){
                        newmail=element.email
                    }
                });
                if (newmail != SignUpinputValues.email){
                    localStorage.setItem("AllUsers",JSON.stringify([...users,{"fullUserName":SignUpinputValues.fullUserName,"email": SignUpinputValues.email}]) )
                    alert('Account created successfully')
                }
                else if (newmail === SignUpinputValues.email){
                    alert('This Email Already exist')
                }
            }
            else{
                localStorage.setItem("AllUsers",JSON.stringify([{"fullUserName":SignUpinputValues.fullUserName,"email": SignUpinputValues.email}]) )
                alert('Account created successfully')
            }
        }
        else{
            alert('can\'t use this mail')
        }
    }

    const handleInput = (e) => {
        setSignUpinputValues({ ...SignUpinputValues, [e.target.name]: e.target.value })
    }

    const handleSignUp = () => {
        if (SignUpinputValues.fullUserName.length > 2 && SignUpinputValues.email.endsWith('@gmail.com')) {
            SaveToLocalStorage()
            setSignUpinputValues({ "fullUserName": '', "email": '' })
            navigate('/login')
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
                <h2 className="text-gray-600 text-lg font-medium title-font mb-5">Sign Up</h2>
                <div className="relative mb-4">
                    <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                    <input onChange={handleInput} type="text" id="full-name" name="fullUserName" value={SignUpinputValues.fullUserName} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input onChange={handleInput} type="email" id="email" name="email" value={SignUpinputValues.email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button onClick={handleSignUp} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign up</button>
                <p  className="text-blue-600 text-sm mt-5">already have an account? 
                <NavLink to="/Login" >
                        <span className="cursor-pointer underline underline-offset-2 font-medium"> Log in</span>
                </NavLink>
                </p>
            </div>
        </div>
    )
}

export default SignUp