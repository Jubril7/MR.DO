import logo from "../assets/001.png";  // adjust path based on Navbar.jsx location

export default function Navbar() {
  return (
    <nav className="bg-orange-200 flex justify-center items-center h-10">
      <div className="flex items-center space-x-2">
        <img 
          src={logo} 
          alt="Logo"
          className="w-8 h-8"
        />
        <h1 className="text-amber-800 font-staatliches font-extrabold text-2xl">
          MR.DO
        </h1>
      </div>
    </nav>
  )
}
