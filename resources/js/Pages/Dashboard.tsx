import CreateUserForm from '@/Components/CreateUserForm';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({auth, users, usersCount, expiredCount, outletCount, userStats}) {

    let [user, setUser] = useState(null);
    const [modalToggle, setModalToggle] = useState(false);

    const onCreated = () => {
        setUser(null)
        setModalToggle(false)
    }

    const onClick = (user) => {
        setUser(user);
        setModalToggle(true)
    }

    const getStatus = (date) => {
        if(!date) return 'Active';
        let today = new Date().getTime();
        let expireDate = new Date(date).getTime();
        return today <= expireDate ? 'Active' : 'Expired';
    }

    return (
        <AuthenticatedLayout auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} >

            <Head title="Dashboard" />
            <Modal show={modalToggle} onClose={() => onCreated()} maxWidth='2xl'>
                <div className='p-4 overflow-auto' style={{height: '650px'}}>
                    <h1 className='mb-4 text-lg font-black'>Create a new Profile</h1>
                    <CreateUserForm onCreated={onCreated} user={user}></CreateUserForm>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className='lg:flex gap-4'>
                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className='fas fa-users fa-2x'></i>
                                <h1>All Users</h1>
                            </div>
                            <p>{usersCount}</p>
                        </div>

                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className="fas fa-user-slash fa-2x"></i>
                                <h1>Expired Accounts</h1>
                            </div>
                            <p>{expiredCount}</p>
                        </div>

                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className="fas fa-user-tie fa-2x"></i>
                                <h1>Outlets</h1>
                            </div>
                            <p>{outletCount}</p>
                        </div>
                    </div>

                    {/* Tablet and Desktop */}
                    <div className='hidden md:flex gap-4 mb-10'>
                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className="fa-solid fa-people-group fa-2x"></i>
                                <h1>Gold</h1>
                            </div>
                            <p>{userStats?.solos}</p>
                        </div>

                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className="fa-solid fa-people-group fa-2x"></i>
                                <h1>Silver</h1>
                            </div>
                            <p>{userStats?.tribes}</p>
                        </div>

                        <div className='text-gray-900 mx-4 lg:mx-0 bg-white p-3 basis-1/3 shadow-sm rounded mb-4 flex justify-between items-center'>
                            <div>
                                <i className="fa-solid fa-people-group fa-2x"></i>
                                <h1>Platinum</h1>
                            </div>
                            <p>{userStats?.lifestyles}</p>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className='md:hidden mb-10 px-4'>
                        <div className='flex gap-4'>
                            <div className='text-gray-900 lg:mx-0 bg-white p-3 basis-1/2 shadow-sm rounded mb-4 flex justify-between items-center'>
                                <div>
                                    <i className="fa-solid fa-people-group fa-2x"></i>
                                    <h1>Gold</h1>
                                </div>
                                <p>{userStats?.solos}</p>
                            </div>

                            <div className='text-gray-900 lg:mx-0 bg-white p-3 basis-1/2 shadow-sm rounded mb-4 flex justify-between items-center'>
                                <div>
                                    <i className="fa-solid fa-people-group fa-2x"></i>
                                    <h1>Silver</h1>
                                </div>
                                <p>{userStats?.tribes}</p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div className='text-gray-900 lg:mx-0 bg-white p-3 basis-1/2 shadow-sm rounded mb-4 flex justify-between items-center'>
                                <div>
                                    <i className="fa-solid fa-people-group fa-2x"></i>
                                    <h1>Platinum</h1>
                                </div>
                                <p>{userStats?.lifestyles}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm mx-4 lg:mx-0 rounded">
                        <div className="p-3 text-gray-900 flex justify-between items-center">
                            <h1>Latest Users</h1>
                            <DangerButton className='bg-amber-500' onClick={() => setModalToggle(!modalToggle)}>New User</DangerButton>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        {/* <th scope="col" className="px-6 py-3">Email</th> */}
                                        <th scope="col" className="px-6 py-3">Phone</th>
                                        {/* <th scope="col" className="px-6 py-3">Code</th> */}
                                        <th scope="col" className="px-6 py-3">Type</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        {
                                            auth?.role?.includes('super admin') && (
                                                <th scope="col" className="px-6 py-3">Action</th>
                                            )
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.data?.map((user, index) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                    <td className="px-6 py-4">{index + 1}</td>
                                                    <td className="px-6 py-4">{user.name}</td>
                                                    {/* <td className="px-6 py-4"> {user.email} </td> */}
                                                    <td className="px-6 py-4"> {user.phone} </td>
                                                    {/* <td className="px-6 py-4"> {user.card?.code || 'NA'} </td> */}
                                                    <td className="px-6 py-4">{user.card?.type}</td>
                                                    <td className="px-6 py-4">{user.category || 'NA'}</td>
                                                    {
                                                        auth?.role?.includes('super admin') && (
                                                            <td className="px-6 py-4">
                                                                <button onClick={() => onClick(user)} className={'bg-sky-500 px-2 py-1 text-white rounded'}>
                                                                    <i className="fa-solid fa-user-pen"></i>
                                                                </button>
                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        })
                                    }

                                    {
                                        users.data?.length == 0 && (<tr>
                                            <td className='text-center py-5' colSpan={8}>No Records Found</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
