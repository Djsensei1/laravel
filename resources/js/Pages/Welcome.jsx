import { Link, Head } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome to Appointment Book" />
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                {/* Top-right Login/Register Links */}
                <div className="absolute top-0 right-0 p-6 text-right">
                    {props.auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-white hover:text-gray-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-white hover:text-gray-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-white hover:text-gray-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Hero Content */}
                <div className="max-w-3xl mx-auto text-center p-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Appointment Book</h1>
                    <p className="text-lg md:text-xl mb-6">
                        Schedule, manage, and stay on top of your appointments with ease. Connect with others in your network effortlessly.
                    </p>
                    {props.auth.user ? (
                        <Link
                            href={route('appointments')}
                            className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-white"
                        >
                            Book an Appointment
                        </Link>
                    ) : (
                        <Link
                            href={route('register')}
                            className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-white"
                        >
                            Get Started
                        </Link>
                    )}
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-sm">
                    <p>Laravel v{props.laravelVersion} (PHP v{props.phpVersion})</p>
                </div>
            </div>
        </>
    );
}