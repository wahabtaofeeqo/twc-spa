import CreateAdminForm from '@/Components/CreateAdminForm';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PageLink from '@/Components/PageLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Admins({auth, users, adminsCount}) {

    const [modalToggle, setModalToggle] = useState(false);

    const onCreated = (data) => {
        setModalToggle(false)
    }

    const onClick = (user) => {
        if(confirm(`Reset ${user.name} Password to default?`)) {
           router.get(`/dashboard/users/reset/${user.id}`);
        }
    }

    return (
        <AuthenticatedLayout auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} >

            <Head title="Admins" />
            <Modal show={modalToggle} onClose={() => setModalToggle(false)}>
                <div className='p-4'>
                    <h1 className='mb-4'>Add Admin</h1>
                    <CreateAdminForm onCreated={onCreated}></CreateAdminForm>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className='lg:flex gap-4 mb-5'>
                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className="fas fa-user-tie fa-2x"></i>
                                <h1>Admins</h1>
                            </div>
                            <p>{adminsCount}</p>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm mx-4 lg:mx-0 rounded">
                        <div className="p-3 text-gray-900 flex justify-end items-center">
                            {/* <h1>All Admins</h1> */}
                            <DangerButton className='bg-amber-500' onClick={() => setModalToggle(!modalToggle)}>New Admin</DangerButton>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Phone</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.data.map((user, index) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                    <td className="px-6 py-4">{index + 1}</td>
                                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-6 py-4"> {user.email} </td>
                                                    <td className="px-6 py-4"> {user.phone} </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => onClick(user)} className={'bg-amber-500 px-2 py-1 text-white rounded'}>
                                                            <i className="fa-solid fa-lock-open"></i>
                                                        </button>
                                                    </td>
                                                    {/* <td className="px-6 py-4"> {user.code} </td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='px-6 py-3'>
                            <PageLink links={users.links}></PageLink>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
