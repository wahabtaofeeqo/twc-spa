import PageLink from '@/Components/PageLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import moment from 'moment';

export default function Transactions({auth, models}) {

    return (
        <AuthenticatedLayout auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} >

            <Head title="Transactions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className='lg:flex gap-4'>
                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className='fas fa-money-bill fa-2x'></i>
                                <h1>All Transactions</h1>
                            </div>
                            <p>{models.total}</p>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm mx-4 lg:mx-0 rounded">
                        <div className="p-3 text-gray-900 flex justify-between items-center">
                            <h1>List</h1>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Amount</th>
                                        <th scope="col" className="px-6 py-3">User</th>
                                        <th scope="col" className="px-6 py-3">Attendant</th>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        models.data.map((model, index) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                    <td className="px-6 py-4"> {index + 1} </td>
                                                    <td className="px-6 py-4"> {model.amount} </td>
                                                    <td className="px-6 py-4"> {model.user?.name || 'NA'} </td>
                                                    <td className="px-6 py-4"> {model.attendant.name} </td>
                                                    <td className="px-6 py-4"> {moment(model.created_at).format('MMMM Do YYYY')} </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    {
                                        models.data.length == 0 && (<tr>
                                            <td className='text-center pt-5' colSpan={8}>No Records Found</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='px-6 py-3'>
                            <PageLink links={models.links}></PageLink>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
