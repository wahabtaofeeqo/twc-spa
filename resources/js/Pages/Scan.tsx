import CreateAdminForm from '@/Components/CreateAdminForm';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PageLink from '@/Components/PageLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Admins({auth}) {

    const [modalToggle, setModalToggle] = useState(false);

    const onCreated = (data) => {
        setModalToggle(false)
    }

    return (
        <AuthenticatedLayout auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} >

            <Head title="Admins" />
            <Modal show={modalToggle} onClose={() => setModalToggle(false)}>
                <div className='p-4'>
                    <h1 className='mb-4'>Add System Admin</h1>
                    <CreateAdminForm onCreated={onCreated}></CreateAdminForm>
                </div>
            </Modal>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima cupiditate vero quasi iure nemo minus rem veritatis qui, facilis, eligendi esse non fugit, beatae dicta ratione magnam excepturi molestiae perspiciatis.
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
