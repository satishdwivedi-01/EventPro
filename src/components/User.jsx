import { useParams } from 'react-router-dom'

import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa'; // For the notification bell icon

const Dashboard = () => {
  const params = useParams()

  const [isVisible, setisVisible] = useState(true)
  const handleVisible = () => {
    setisVisible(!isVisible)
  }

  const [profile, setProfile] = useState({
    'fullUserName': '',
    'email': '',
    'picture': null,
  });
  const [availability, setAvailability] = useState({ 'from': '', 'to': '' });
  const [availableDates, setavailableDates] = useState([]);

  const [upcomingEvents, setupcomingEvents] = useState([]);
  const [notifications, setnotifications] = useState([]);
  const [participants, setparticipants] = useState([]);

  const getfromLocalStorage = () => {
    const allusers = JSON.parse(localStorage.getItem("AllUsers"))
    const admindata = JSON.parse(localStorage.getItem("AdminData"))
    if (allusers) {
      allusers.forEach(element => {
        if (element.email === params.usermail) {
          setProfile({ ...profile, 'fullUserName': element.fullUserName, 'email': element.email })
        }
        if (element.email === params.usermail && element.picture != null) {
          setProfile({ ...profile, 'fullUserName': element.fullUserName, 'email': element.email, 'picture': element.picture })
        }
        if (element.email === params.usermail && (!("availableDates" in element))) {
          element.availableDates = []
        }
        if (element.email === params.usermail && element.availableDates.length > 0) {
          setavailableDates(element.availableDates)
        }

      });
      localStorage.setItem('AllUsers', JSON.stringify(allusers))

    }
    if (admindata) {
      if (admindata.upcomingEvents.length > 0) {
        let newArr = admindata.upcomingEvents.filter(el => {
          if (el.members.includes(params.usermail)) {
            return el
          }
        })
        let nArr = []
        newArr.forEach(el => {
          nArr.unshift(el.Notification)
        })
        setnotifications(nArr)

        newArr.forEach(el => {
          let nprtcpnts = []
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
          el.participants = nprtcpnts
        })

        setupcomingEvents(newArr)
      }
    }


  }
  useEffect(() => {
    getfromLocalStorage()
  }, [])


  const handleChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value })
  }

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

  const handleAdd = () => {
    if (availability.from != '' && availability.to != '') {
      const dateObject1 = new Date(availability.from)
      const dateObject2 = new Date(availability.to)
      let dateAndTime1 = dateObject1.toLocaleDateString("eg-gb", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
      let dateAndTime2 = dateObject2.toLocaleDateString("eg-gb", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })

      let allusers = JSON.parse(localStorage.getItem('AllUsers'))
      allusers.forEach((el) => {
        if (el.email === params.usermail) {
          el.availableDates = [...availableDates, { 'from': dateAndTime1, 'to': dateAndTime2 }]
        }
      })
      localStorage.setItem("AllUsers", JSON.stringify(allusers))

      setavailableDates([...availableDates, { 'from': dateAndTime1, 'to': dateAndTime2 }])
      setAvailability({ 'from': '', 'to': '' })
    }
    else {
      alert('fill Date and time Correctly')
    }
  }
  const handleDelete = (index) => {
    const confirmation = window.confirm("Do you really want to delete this password?");
    if (confirmation){
      const newArr = availableDates.filter((_, indx) => {
        return index != indx
      })
      let allusers = JSON.parse(localStorage.getItem('AllUsers'))
      allusers.forEach((el) => {
        if (el.email === params.usermail) {
          el.availableDates = newArr
        }
      })
      localStorage.setItem("AllUsers", JSON.stringify(allusers))
      setavailableDates(newArr)
    }
  }
  const handleEdit = (index) => {
    let dateObject1 = new Date(availableDates[index].from)
    let dateObject2 = new Date(availableDates[index].to)
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

    setAvailability({ 'from': (newfromdate + fromtime).replace(" ", "T"), 'to': (newTodate + Totime).replace(" ", "T") })


    const newArr = availableDates.filter((_, indx) => {
      return index != indx
    })
    setavailableDates(newArr)
  }


  const handleFileUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    let allusers = JSON.parse(localStorage.getItem("AllUsers"))
    allusers.forEach((el) => {
      if (el.email === params.usermail) {
        el.picture = file
      }
    })
    console.log(allusers)
    localStorage.setItem("AllUsers", JSON.stringify(allusers))
    setProfile((prev) => ({ ...prev, picture: file }));

  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center text-blue-500 relative">

      <div className="flex mb-5 w-full">
        <h1 className="m-3  font-bold text-2xl flex  ">
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

      <div className="grid grid-cols-3 gap-8 w-full shadow-blue-200 shadow-inner drop-shadow-2xl p-4 py-5 pb-6">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-200 col-span-1 relative">
          <h2 className="mb-4 text-green-500 flex items-center font-normal mt-2"><span className='text-xs '>★</span>User</h2>
          <div className="flex flex-col items-center absolute left-[25%] top-[25%]">
            <label htmlFor="fileInput">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-4 cursor-pointer">
                {profile.picture ? (
                  <img src={profile.picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
            </label>
            <input type="file" onChange={handleFileUpload} id='fileInput' className="hidden" />
            <p className="font-medium text-lg text-gray-800">{profile.fullUserName}</p>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Availability section */}
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-200 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Set Your Availability</h2>
          <div className='flex justify-between items-center'>
            <div className='flex items-center  gap-2 w-[45%] justify-center'>
              <span className='w-[17%]'>From :</span>
              <input
                type="datetime-local"
                name='from'
                value={availability.from}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-500 "
              />
            </div>
            <div className='flex items-center gap-2 w-[45%] justify-center'>
              <span className='w-[17%]'>To : </span>
              <input
                type="datetime-local"
                name='to'
                value={availability.to}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-500"
              />
            </div>
            <button onClick={handleAdd} className='bg-blue-600 text-white rounded-full cursor-pointer text-3xl pb-[.3rem] px-[.6rem]'>
              +
            </button>
          </div>
          {availableDates.length > 0 ? (
            <div className='flex flex-col items-start'>
              <h2 className="text-xl font-semibold mt-4">Dates when You are Available</h2>
              <ul className='pl-5 mt-2 w-[100%]  h-[19vh]  max-h-[19vh] text-gray-500 flex flex-col items-start gap-1 overflow-auto'>
                {availableDates.map((el, index) => {
                  return <li key={index} className='list-disc shadow-md relative'>
                    <div className='flex items-center '>
                      <p className="m-1  p-2">{`From ${el.from}`} </p> <span className="font-extrabold text-xl ">-</span>
                      <p className=" m-1  p-2">{`To ${el.to}`} </p>
                      <div className='ml-2 absolute top-[.4.3rem] right-[-3.3rem]  p-[.1rem]'>
                        <lord-icon
                          onClick={() => handleEdit(index)}

                          src="https://cdn.lordicon.com/vhyuhmbl.json"
                          trigger="hover"
                          colors="primary:#e4e4e4,secondary:#ffffff,tertiary:#000000"
                          style={{ "width": '23px', "height": '23px', "cursor": 'pointer' }}>
                        </lord-icon>
                        <lord-icon
                          onClick={() => handleDelete(index)}
                          src="https://cdn.lordicon.com/hjbrplwk.json"
                          trigger="hover"
                          colors="primary:#646e78,secondary:#000000,tertiary:#ebe6ef,quaternary:#3a3347"
                          style={{ "width": '22px', "height": '25px', "cursor": 'pointer' }}>
                        </lord-icon>
                      </div>

                    </div>
                  </li>
                })
                }
              </ul>
            </div>
          ) : <h2 className='mt-[2.5vh] text-xl h-[14.7vh] w-[100%] '>No date and time to show? Create from above</h2>
          }
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-200 col-span-2 w-[100%]">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events/Meetings</h2>
          <ul className="space-y-4 text-gray-800">
            {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md relative">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600 ">{`${event.from}          -          ${event.to}`}</p>
                <button onClick={() => handleVisiblepartcipants(index)} className='absolute right-[8%] top-[31%] text-blue-500 underline underline-offset-4 '>See participants</button>

              </li>
            )) : <li className='text-blue-500 font-semibold'>Upcoming Events/meetings scheduled by admin, will be shown here</li>
            }
          </ul>
          {participants.length > 0 && <div className='fixed h-[22vh]  left-[31%] bottom-[15%] z-10 shadow-md shadow-blue-300  border bg-white border-blue-200 p-2 pt-4'>
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

        {/* Notifications Section */}
        {isVisible && (
          <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-200 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <ul className="space-y-3">
              {notifications.map((note, index) => (
                <li key={index} className="p-3 bg-yellow-100 rounded-lg shadow-md text-yellow-700">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div onClick={handleVisible} className="cursor-pointer absolute right-[7%] bottom-[2%]">
        <FaBell className="text-2xl text-gray-600 " />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 text-xs">
            {notifications.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

