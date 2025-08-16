import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
            {/* Error Illustration */}
            <img
                src="https://i.postimg.cc/L88RR8LV/4730711-2480259.jpg"
                alt="Lost Pet - 404"
                className="w-64 mb-6"
            />

            {/* Error Message */}
            {/* <h1 className="text-6xl font-bold text-red-500">404</h1> */}
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Oops! This page is missing...
            </h2>
            <p className="mt-2 text-gray-600 max-w-md">
                Looks like this pet wandered off! 🐾 The page you are looking for
                doesn’t exist or has been moved.
            </p>

            {/* Back Home Button */}
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-full shadow-md hover:bg-transparent hover:border-1 hover:border-teal-500 hover:text-teal-500 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
