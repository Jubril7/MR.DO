import logo from "../assets/001.png";

export default function Navbar() {
  return (
    <nav className="bg-orange-200 flex justify-center items-center h-20 shadow-md">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-3">
          <img 
            src={logo} 
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-amber-800 font-staatliches font-extrabold text-2xl">
            MR.DO
          </h1>
        </div>
        <span className="text-sm text-amber-700 tracking-wide italic mt-1">
          An AI-powered To-Do List
        </span>
      </div>
    </nav>
  )
}
