import { Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function AppLayout() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ColabOS</h1>
          <div className="flex items-center space-x-4">
            <span>Hola, {user?.firstName}</span>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}