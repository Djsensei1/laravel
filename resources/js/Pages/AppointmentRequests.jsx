import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function AppointmentRequests(props) {
    const { auth, requestedByMe, requestedWithMe } = props;

    const { patch, processing } = useForm();

    const handleStatusUpdate = (appointmentId, status) => {
        patch(route('appointment.updateStatus', appointmentId), {
            data: { status },
            onSuccess: () => console.log('Status updated'),
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Appointment Requests</h2>}
        >
            <Head title="Appointment Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Requested By Me */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Appointments I Requested</h3>
                            {requestedByMe.length > 0 ? (
                                <ul className="space-y-4">
                                    {requestedByMe.map((appointment) => (
                                        <li key={appointment.id} className="border-b pb-2">
                                            <p>
                                                <strong>With:</strong> {appointment.with_user.name} <br />
                                                <strong>Time:</strong> {new Date(appointment.appointment_time).toLocaleString()} <br />
                                                <strong>Description:</strong> {appointment.description || 'N/A'} <br />
                                                <strong>Status:</strong> {appointment.status}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No appointments requested yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Requested With Me */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Appointments Requested With Me</h3>
                            {requestedWithMe.length > 0 ? (
                                <ul className="space-y-4">
                                    {requestedWithMe.map((appointment) => (
                                        <li key={appointment.id} className="border-b pb-2 flex justify-between items-center">
                                            <div>
                                                <p>
                                                    <strong>From:</strong> {appointment.user.name} <br />
                                                    <strong>Time:</strong> {new Date(appointment.appointment_time).toLocaleString()} <br />
                                                    <strong>Description:</strong> {appointment.description || 'N/A'} <br />
                                                    <strong>Status:</strong> {appointment.status}
                                                </p>
                                            </div>
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(appointment.id, 'approved')}
                                                    disabled={processing}
                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
                                                    disabled={processing}
                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No pending requests.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}