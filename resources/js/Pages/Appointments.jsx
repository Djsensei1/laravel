import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Appointments(props) {
    const { auth, users } = props;

    const { data, setData, post, processing, errors } = useForm({
        with_user_id: '',
        appointment_time: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('appointments.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Appointments</h2>}
        >
            <Head title="Appointments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-4">Request a New Appointment</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="with_user_id" className="block text-sm font-medium text-gray-700">
                                        With User
                                    </label>
                                    <select
                                        id="with_user_id"
                                        value={data.with_user_id}
                                        onChange={(e) => setData('with_user_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Select a user</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.with_user_id && (
                                        <p className="mt-2 text-sm text-red-600">{errors.with_user_id}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-700">
                                        Appointment Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="appointment_time"
                                        value={data.appointment_time}
                                        onChange={(e) => setData('appointment_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.appointment_time && (
                                        <p className="mt-2 text-sm text-red-600">{errors.appointment_time}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        rows="3"
                                    />
                                    {errors.description && (
                                        <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        Request Appointment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}