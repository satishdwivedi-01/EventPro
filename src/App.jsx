import { NavLink } from "react-router-dom"

function App() {

  return (
    <>
      <div className=" bg-gray-200 max-h-screen">
      
      <section className="flex items-center justify-center py-20 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Plan and Schedule Your Events Seamlessly</h2>
          <p className="text-lg mb-8">Join us and manage all your events with ease and efficiency.</p>
          <NavLink to="/signUp" className="bg-white text-blue-500 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold">
            Get Started
          </NavLink>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">About</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold mb-4">Easy Scheduling</h4>
              <p className="text-gray-600">Create and manage your events with a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold mb-4">Real-time Notifications</h4>
              <p className="text-gray-600">Get instant updates on event changes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-semibold mb-4">User-friendly Interface</h4>
              <p className="text-gray-600">Navigate through the app with ease.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  )
}

export default App