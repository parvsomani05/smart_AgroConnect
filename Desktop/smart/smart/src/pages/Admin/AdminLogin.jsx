export default function AdminLogin() {
    return (
      <div className="flex flex-col items-center p-5">
        <h2 className="text-2xl font-bold mb-5">Admin Login</h2>
        <input type="text" placeholder="Username" className="border p-2 w-full" />
        <input type="password" placeholder="Password" className="border p-2 w-full mt-2" />
        <button className="bg-blue-500 text-white px-4 py-2 mt-3">Login</button>
      </div>
    );
  }
  