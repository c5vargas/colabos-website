import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 text-center shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900">404</h2>
          <p className="mb-6 text-gray-600">La página que buscas no existe.</p>
          <Link
            to="/"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
