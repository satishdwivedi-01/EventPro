import { useState, useEffect } from "react"

const Admin = () => {

    const [availableMenmbers, setavailableMenmbers] = useState([])
    const [inputDates, setinputDates] = useState({ 'from': '', 'to': '' })
    const [upcomingEvents, setupcomingEvents] = useState([{ 'members': ['dwivedisatish06@gmail.com'], 'from': '', 'to': '', 'title': '' }])
    const [AdminProfile, setAdminProfile] = useState({ 'name': 'Satish Dwivedi', 'email': 'dwivedisatish06@gmail.com', 'picture': null })
    const [EventTitle, setEventTitle] = useState('')
    const [TypeOfEvent, setTypeOfEvent] = useState('')
    const [SelectedMember, setSelectedMember] = useState('')
    const [CheckedMembers, setCheckedMembers] = useState([])
    const [Notifications, setNotifications] = useState([])
    const [VisibleCreate, setVisibleCreate] = useState(false)
    const [participants, setparticipants] = useState([]);
    const saveToLocalStorage = (data) => {
        localStorage.setItem("AdminData", JSON.stringify(data))
    }
    const getfromLocalStorage = async () => {
        const allusers = await JSON.parse(localStorage.getItem('AllUsers'))
        const admindata = await JSON.parse(localStorage.getItem('AdminData'))
        const available = await allusers.filter(el => {
            if ("availableDates" in el && el.availableDates.length > 0) {
                return el
            }
        })
        if (admindata.upcomingEvents.length > 0) {
            let newArr=admindata.upcomingEvents
            newArr.forEach(el => {
                let nprtcpnts =[]
                el.members.forEach(member => {
                    if (member === "dwivedisatish06@gmail.com") {
                        nprtcpnts.push({ 'fullUserName': 'Satish Dwivedi', 'email': "dwivedisatish06@gmail.com" })
                    }
                    else {
                        allusers.forEach(element => {
                            if (element.email === member) {
                                nprtcpnts.push({ 'fullUserName': element.fullUserName, 'email': element.email })
                            }

                        })
                    }
                })
                el.participants=nprtcpnts
            })
            
            setupcomingEvents(newArr)
        }
        if (admindata.notifications) {
            setNotifications(admindata.notifications)
        }
        setAdminProfile({ ...AdminProfile, 'picture': admindata.picture })
        setavailableMenmbers(available)
    }
    useEffect(() => {
        getfromLocalStorage()
    }, [])


    const handleVisiblepartcipants = (eventIndex) => {
        upcomingEvents.forEach((el, idx) => {
            if (idx === eventIndex) {  
                setparticipants(el.participants)
            }
        });
    };
    const closeVisibility = () => {
        setparticipants([])
    };

    const handleFileUpload = (e) => {
        const newURL = URL.createObjectURL(e.target.files[0])
        setAdminProfile({ ...AdminProfile, 'picture': newURL })
        const admindata = JSON.parse(localStorage.getItem('AdminData'))
        saveToLocalStorage({ ...admindata, 'picture': newURL })
    }
    const handleRadio = (e) => {
        setCheckedMembers([])
        setSelectedMember('')
        setTypeOfEvent(e.target.value)
    }
    const handleRadio2 = (e) => {
        setSelectedMember(e.target.value)
    }
    const handleCheckBox = (e) => {
        let mail = e.target.name
        if (e.target.checked) {
            setCheckedMembers([...CheckedMembers, mail])
        }
        else {
            let newarr = CheckedMembers.filter((el) => {
                return el != mail
            })
            setCheckedMembers(newarr)
        }
    }

    const handleChange = (e) => {
        setinputDates({ ...inputDates, [e.target.name]: e.target.value })
    }
    const handleCreate = () => {

        if (inputDates.from != '' && inputDates.to != '' && EventTitle.length > 1) {
            if (availableMenmbers.length > 0) {
                if (TypeOfEvent) {
                    if (SelectedMember.length > 6 || CheckedMembers.length > 0) {
                        const dateObject1 = new Date(inputDates.from)
                        const dateObject2 = new Date(inputDates.to)
                        let dateAndTime1 = dateObject1.toLocaleDateString("eg-gb", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
                        let dateAndTime2 = dateObject2.toLocaleDateString("eg-gb", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })


                        let allusers = JSON.parse(localStorage.getItem('AllUsers'))
                        if (CheckedMembers.length > 0) {
                            let count = 0
                            allusers.forEach(el => {
                                CheckedMembers.forEach(element => {
                                    if (el.email === element) {
                                        let flag = 0
                                        el.availableDates.forEach(date => {
                                            let adminInput1 = new Date(inputDates.from);
                                            let adminInput2 = new Date(inputDates.to);
                                            let UserInput1 = new Date(date.from);
                                            let UserInput2 = new Date(date.to);
                                            if (adminInput1 >= UserInput1 && adminInput2 <= UserInput2) {
                                                flag = 1
                                            }
                                        })
                                        if (flag === 1) {
                                            count += 1
                                        }
                                    }
                                })
                            })
                            if (count === CheckedMembers.length) {
                                setupcomingEvents([...upcomingEvents, { 'title': EventTitle, 'Notification': `'${EventTitle}' scheduled on ${dateAndTime1}`, 'from': dateAndTime1, 'to': dateAndTime2, "members": [...CheckedMembers, 'dwivedisatish06@gmail.com'] }])
                                const admindata = JSON.parse(localStorage.getItem('AdminData'))
                                saveToLocalStorage({ ...admindata, upcomingEvents: [...upcomingEvents, { 'title': EventTitle, 'Notification': `'${EventTitle}' scheduled on ${dateAndTime1}`, 'from': dateAndTime1, 'to': dateAndTime2, "members": [...CheckedMembers, 'dwivedisatish06@gmail.com'] }] })
                            }
                            else {
                                alert('your inputs are out of range of user availabity')
                                setVisibleCreate(!VisibleCreate)
                                return;
                            }

                        }
                        else {
                            let count = 0
                            allusers.forEach(el => {
                                if (el.email === SelectedMember) {
                                    let flag = 0
                                    el.availableDates.forEach(date => {
                                        let adminInput1 = new Date(inputDates.from);
                                        let adminInput2 = new Date(inputDates.to);
                                        let UserInput1 = new Date(date.from);
                                        let UserInput2 = new Date(date.to);
                                        if (adminInput1 >= UserInput1 && adminInput2 <= UserInput2) {
                                            flag = 1
                                        }
                                    })
                                    if (flag === 1) {
                                        count += 1
                                    }
                                }
                            })
                            if (count != 0) {
                                setupcomingEvents([...upcomingEvents, { 'title': EventTitle, 'Notification': `'${EventTitle}' scheduled on ${dateAndTime1}`, 'from': dateAndTime1, 'to': dateAndTime2, "members": [SelectedMember, 'dwivedisatish06@gmail.com'] }])
                                const admindata = JSON.parse(localStorage.getItem('AdminData'))
                                saveToLocalStorage({ ...admindata, upcomingEvents: [...upcomingEvents, { 'title': EventTitle, 'Notification': `'${EventTitle}' scheduled on ${dateAndTime1}`, 'from': dateAndTime1, 'to': dateAndTime2, "members": [SelectedMember, 'dwivedisatish06@gmail.com'] }] })
                            }
                            else {
                                alert('your inputs are out of range of user availabity')
                                setVisibleCreate(!VisibleCreate)
                                return;
                            }
                        }



                        setinputDates({ 'from': '', 'to': '' })
                        setEventTitle('')
                        setVisibleCreate(!VisibleCreate)
                    }
                    else {
                        alert('Select a Member to continue')
                    }
                }
                else {
                    alert('Select Type Of Event/Meeting')
                }

            }
            else {
                alert('No Member is Available')
            }
        }
        else {
            alert('fill Date, time and Title Correctly')
        }
    }
    const handleAdd = () => {

        if (inputDates.from != '' && inputDates.to != '' && EventTitle.length > 1) {
            if (availableMenmbers.length > 0) {
                setVisibleCreate(!VisibleCreate)

            }
            else {
                alert('No Member is Available')
            }
        }
        else {
            alert('fill Date, time and Title Correctly')
        }
    }
    const handleEdit = (index) => {
        let dateObject1 = new Date(upcomingEvents[index].from)
        let dateObject2 = new Date(upcomingEvents[index].to)
        let reverseDateAndTime1 = dateObject1.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })
        let reverseDateAndTime2 = dateObject2.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })
        reverseDateAndTime1 = reverseDateAndTime1.replaceAll("/", '-')
        reverseDateAndTime2 = reverseDateAndTime2.replaceAll("/", '-')
        let [fromdate, fromtime] = reverseDateAndTime1.split(",")
        let [Todate, Totime] = reverseDateAndTime2.split(",")
        fromdate = fromdate.split("-")
        Todate = Todate.split("-")
        let newfromdate = `${fromdate[2]}-${fromdate[0]}-${fromdate[1]}`
        let newTodate = `${Todate[2]}-${Todate[0]}-${Todate[1]}`

        setinputDates({ 'from': (newfromdate + fromtime).replace(" ", "T"), 'to': (newTodate + Totime).replace(" ", "T") })
        setEventTitle(upcomingEvents[index].title)


        const newArr = upcomingEvents.filter((_, indx) => {
            return index != indx
        })
        setupcomingEvents(newArr)
    }
    const handleDelete = (index) => {
        const confirmation = window.confirm("Do you really want to delete this password?");
        if (confirmation){
            let newArr = upcomingEvents.filter((el) => {
                return (upcomingEvents[index] != el)
            })
            setupcomingEvents(newArr)
            const admindata = JSON.parse(localStorage.getItem('AdminData'))
            saveToLocalStorage({ ...admindata, 'upcomingEvents': newArr })
        }
    }
    return (
        <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center text-blue-500 relative">
            <div className="flex w-full mb-5">
                <h1 className="m-3  font-bold text-2xl flex items-center text-center ">
                    <img
                        src="/event.png"
                        height={40}
                        width={40}
                        className=" rounded-full scale-75"
                    />{" "}
                    <span className="text-blue-500 italic">Event</span>{" "}
                    <span className="text-blue-400">pro</span>
                </h1>
            </div>
            <div className="flex gap-8 w-full min-h-[78vh]  shadow-blue-200 shadow-inner drop-shadow-2xl p-4 py-5 pb-6">
                <div className="w-[34%] h-full flex flex-col gap-8">
                    {/* profile section */}
                    <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-200  col-span-1 h-[45%]">
                        <h2 className="mb-4 text-green-500 flex items-center font-normal"><span className='text-xs '>★</span>Admin</h2>
                        <div className="flex flex-col items-center">
                            <label htmlFor="fileInput">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-4 cursor-pointer">
                                    <img src={AdminProfile.picture} alt="Profile" className="w-full h-full object-cover " />
                                </div>
                            </label>
                            <input type="file" onChange={handleFileUpload} id='fileInput' className="hidden" />
                            <p className="font-medium text-lg text-gray-800">{AdminProfile.name}</p>
                            <p className="text-gray-500">{AdminProfile.email}</p>
                        </div>
                    </div>
                    {/* Upcoming Events Section */}
                    <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-200 col-span-2 h-[55%]">
                        <h2 className="text-xl font-semibold mb-4">Upcoming Events/Meetings</h2>
                        <ul className="space-y-4 text-gray-800 overflow-auto max-h-[17rem]">
                            {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) =>{ 
                                return ( <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md relative">
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <p className="text-sm text-gray-600">{`${event.from}          -          ${event.to}`}</p>
                                    <div className='ml-2 absolute top-[1.5rem] right-[2.5rem]  p-[.1rem]'>
                                        <lord-icon
                                            onClick={() => handleEdit(index)}

                                            src="https://cdn.lordicon.com/vhyuhmbl.json"
                                            trigger="hover"
                                            colors="primary:#e4e4e4,secondary:#ffffff,tertiary:#000000"
                                            style={{ "width": '27px', "height": '27px', "cursor": 'pointer' }}>
                                        </lord-icon>
                                        <lord-icon
                                            onClick={() => handleDelete(index)}
                                            src="https://cdn.lordicon.com/hjbrplwk.json"
                                            trigger="hover"
                                            colors="primary:#646e78,secondary:#000000,tertiary:#ebe6ef,quaternary:#3a3347"
                                            style={{ "width": '26px', "height": '29px', "cursor": 'pointer' }}>
                                        </lord-icon>
                                    </div>
                                    <button onClick={()=>handleVisiblepartcipants(index)} className='pt-1 text-blue-500 underline underline-offset-4 '>See participants</button>
                                </li>
                            )}) : <div className="text-blue-500">No Event To Show? Create One</div>
                        }
                        </ul>
                        {participants.length>0 && <div className='fixed h-[22vh]  left-[24%] bottom-[17%] z-10 shadow-md shadow-blue-300  border bg-white border-blue-200 p-2 pt-4'>
                            <h2 className='text-center text-blue-400 font-bold w-[80%]'>Participants of Session</h2>
                            <span onClick={closeVisibility} className=" absolute top-4 right-3 h-6 w-6 flex items-center justify-center cursor-pointer rounded-full border border-blue-400">𐤕</span>
                            <div className=' mt-1 min-h-[80%] max-h-[80%] overflow-auto'>
                                {participants.map((member, index) => {
                                    return <h2 key={index} className="text-blue-800 font-semibold m-1"><span className='mx-1'>•</span>{member.fullUserName} <p className='pl-5'>{member.email}</p> </h2>
                                })}
                            </div>
                        </div>
                        }
                    </div>
                </div>

                {/* Availability section */}
                <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-200 col-span-2 w-[65%] ">
                    <div className="shadow-blue-300 shadow-md drop-shadow-2xl border border-gray-200  container px-4 p-5">
                        <h2 className="text-xl font-semibold mb-6 mt-3">Set Meeting Slotes</h2>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center  gap-2 w-[45%] justify-center'>
                                <span className='w-[17%]'>From :</span>
                                <input
                                    type="datetime-local"
                                    name='from'
                                    value={inputDates.from}
                                    onChange={handleChange}
                                    className="w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-500 "
                                />
                            </div>
                            <div className='flex items-center gap-2 w-[45%] justify-center'>
                                <span className='w-[17%]'>To : </span>
                                <input
                                    type="datetime-local"
                                    name='to'
                                    value={inputDates.to}
                                    onChange={handleChange}
                                    className="w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-500"
                                />
                            </div>
                            <button onClick={handleAdd} className='bg-blue-600 text-white rounded-full cursor-pointer text-3xl pb-[.3rem] px-[.6rem]'>
                                +
                            </button>
                        </div>
                        <div className="flex mt-3 items-center">
                            <span className='w-[7.2%]'>Title :</span>
                            <input onChange={(e) => { setEventTitle(e.target.value) }} value={EventTitle} type="text" placeholder="title" className="w-[85.5%] text-gray-500 rounded-md p-2 pl-3 border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-400 " />
                        </div>

                    </div>
                    {availableMenmbers.length > 0 ? (
                        <div className='flex flex-col items-start mt-[5vh] shadow-blue-300 shadow-md drop-shadow-2xl border border-gray-200  container px-4'>
                            <h2 className="text-xl font-semibold mt-6 text-blue-500 text-center w-[100%]">Available Members For Event</h2>
                            <ul className='pl-5 mt-4 w-[100%] max-h-[33vh]  h-[33vh] text-gray-500 flex flex-col items-start gap-1 overflow-auto '>
                                {availableMenmbers.map((el, index) => {
                                    return <li key={index} className='list-disc relative'>
                                        <h2 className="text-blue-800 font-semibold m-1">{el.fullUserName}{` (${el.email})`}</h2>
                                        {el.availableDates.map((element, index) => {
                                            return <div key={index} className="flex items-center ">
                                                <p className="shadow-md m-1  p-2">{`From ${element.from}`} </p> <span className="font-extrabold text-xl ">-</span>
                                                <p className="shadow-md m-1  p-2">{`To ${element.to}`} </p>

                                            </div>
                                        })}
                                    </li>
                                })
                                }
                            </ul>
                        </div>
                    ) : <h2 className='mt-[2.5vh] text-xl h-[14.7vh] w-[100%] '>No Members are available</h2>
                    }
                </div>
            </div>

            {/* Seassion Setting Section */}
            {VisibleCreate && <div className="h-[100vh] w-[100vw] bg-blue-50/60 absolute top-0 ">
                <div className="w-[40%] h-[82%] bg-white/70 m-auto mt-[7vh] opacity-100 shadow-xl shadow-gray-400 p-5 flex flex-col justify-around">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl mb-1 font-semibold">Type Of Event/Meeting :</h2>

                        <label htmlFor="1-1" className="flex gap-2 text-gray-600 text-lg font-semibold">
                            <input type="radio" checked={TypeOfEvent === "1-1"} onChange={handleRadio} name="seassonType" value={'1-1'} id="1-1" /> <span>One To One</span>
                        </label>
                        <label htmlFor="1-many" className="flex items-center gap-2 text-gray-600 text-lg font-semibold">
                            <input type="radio" checked={TypeOfEvent === "1-many"} onChange={handleRadio} name="seassonType" value='1-many' id="1-many" /> <span>One To Many</span>
                        </label>
                    </div>

                    {TypeOfEvent === "1-many" ? <div className='flex flex-col items-start  shadow-blue-300 shadow-md drop-shadow-2xl border border-gray-200  container px-4'>
                        <h2 className="text-xl font-semibold mt-6 text-blue-500 text-center w-[100%]">Select Member You Want For Event</h2>
                        <ul className='pl-5 mt-4 w-[100%]  h-[33vh] max-h-[33vh] text-gray-500 flex flex-col items-start gap-1 overflow-auto '>
                            {availableMenmbers.map((el, index) => {
                                return <li key={index} className=' relative'>
                                    <label htmlFor={index} className="flex items-center">
                                        <input type="checkbox" onChange={handleCheckBox} id={index} value={el.fullUserName}
                                            name={el.email} checked={CheckedMembers.includes(el.email)} className=" h-4 w-4" />
                                        <h2 className="text-blue-800 font-semibold m-1">{el.fullUserName}{` (${el.email})`}</h2>
                                    </label>
                                    {el.availableDates.map((element, index) => {
                                        return <div key={index} className="flex items-center ">
                                            <p className="shadow-md m-1  p-2">{`From ${element.from}`} </p> <span className="font-extrabold text-xl ">-</span>
                                            <p className="shadow-md m-1  p-2">{`To ${element.to}`} </p>

                                        </div>
                                    })}
                                </li>
                            })
                            }
                        </ul>
                    </div> : <div className='flex flex-col items-start  shadow-blue-300 shadow-md drop-shadow-2xl border border-gray-200  container px-4'>
                        <h2 className="text-xl font-semibold mt-6 text-blue-500 text-center w-[100%]">Select Member You Want For Event</h2>
                        <ul className='pl-5 mt-4 w-[100%]  h-[33vh] max-h-[33vh] text-gray-500 flex flex-col items-start gap-1 overflow-auto '>
                            {availableMenmbers.map((el, index) => {
                                return <li key={index} className=' relative'>
                                    <label htmlFor={index} className="flex items-center">
                                        <input type="radio" id={index} value={el.email} checked={SelectedMember === el.email}
                                            onChange={handleRadio2} name="Select" className=" h-4 w-4" />
                                        <h2 className="text-blue-800 font-semibold m-1">{el.fullUserName}{` (${el.email})`}</h2>
                                    </label>
                                    {el.availableDates.map((element, index) => {
                                        return <div key={index} className="flex items-center ">
                                            <p className="shadow-md m-1  p-2">{`From ${element.from}`} </p> <span className="font-extrabold text-xl ">-</span>
                                            <p className="shadow-md m-1  p-2">{`To ${element.to}`} </p>

                                        </div>
                                    })}
                                </li>
                            })
                            }
                        </ul>
                    </div>
                    }
                    <button onClick={handleCreate} className="bg-blue-700 text-white p-3 rounded-md text-lg font-semibold">Create Event</button>
                </div>
            </div>
            }
        </div>
    )
}

export default Admin