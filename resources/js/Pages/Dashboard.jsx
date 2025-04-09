import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    const { auth } = props; // Destructure auth from props for easier access

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Welcome, {auth.user.name}!</h3>
                            <p>You’re logged in. Here’s what’s happening today.</p>
                        </div>
                    </div>

                    {/* Upcoming Appointments Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
                            <p className="text-gray-700">
                                You have no appointments scheduled yet. Add one from the{' '}
                                <a href="/appointments" className="text-blue-600 hover:underline">
                                    Appointments
                                </a>{' '}
                                page!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}