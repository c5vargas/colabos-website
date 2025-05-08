import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <section className="bg-[url('/assets/images/backgrounds/abstract-black-white.avif')] bg-cover bg-center">
      <div className="min-h-screen bg-gray-50/95 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">ColabOS</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Tu escritorio colaborativo en la nube
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:rounded-lg sm:px-10 flex flex-col items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}