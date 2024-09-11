import CreateAdminForm from '@/Components/CreateAdminForm';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PageLink from '@/Components/PageLink';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function Scan({auth, csrf}) {

    const [card, setCard] = useState<any>(null);
    const [error, setError] = useState<any>('');
    const [prompt, setPrompt] = useState<any>('');
    const [message, setMessage] = useState<any>('');
    const [isCharging, setCharging] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [selectedUser, setUser] = useState<any>(null);

    const { data, setData, reset } = useForm({
        card: '',
        code: '',
    });

    const { data: chargeData, setData: setChargeData} = useForm({
        price: 0
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onChange = (event) => {
        setChargeData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setError('');
        setMessage('');

        axios.post(route('scans.scan'), data).then(res => {
            setProcessing(false)
            setCard(res.data.card);
        }).catch(err => {
            setProcessing(false);
            setError(err?.response?.data?.message || 'Something went wrong. Please try again');
        })
    };

    const charge = (e) => {
        e.preventDefault();
        if(!selectedUser) {
            setPrompt('Select the user using the Card');
            return;
        }

        setError('');
        setMessage('');
        setProcessing(true);

        let payload = {
            ...chargeData,
            card_id: card.id,
            user_id: selectedUser.id
        }

        router.post(route('charge'), payload, {
            onSuccess: () => {
                let updatedCard = {
                    ...card,
                    amount: card.amount - chargeData.price
                }
                setCard(updatedCard);
                setMessage('Card successfully charged');
                setTimeout(() => {
                    reset();
                    setCard(null);
                    setPrompt('');
                    setCharging(false);
                    setProcessing(false);
                }, 5000);
            },
            onError: e => {
                setPrompt('');
                setProcessing(false);
            }
        });
    };;

    return (
        <AuthenticatedLayout auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} >

            <Head title="Scan card" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h4 className='text-2xl font-black'>Scan Cards</h4>
                    <p className='mb-10 text-slate-500'>
                        Scan the QR code on the card to verify user's details.
                    </p>
                    {
                        card?.users && (
                            <div className='mb-4 bg-white rounded p-5'>
                                <p className='text-red-500 mb-2'>{prompt}</p>
                                <div className='md:flex gap-3'>
                                    {
                                        card.users?.map((user: any, index) => {
                                        return (
                                            <div className={(selectedUser?.id == user.id ? 'border-b-4 border-amber-500' : '') + ' basis-2/4 cursor-pointer pb-2'}
                                                key={index} onClick={() => setUser(user)}>
                                                <h4 className='text-lg mb-3 font-bold'>{user.is_buyer ? "Buyer's" : "User's"} Details:</h4>
                                                <p>Name: {user.name || 'NA'}</p>
                                                <p>Phone: {user.phone || 'NA'}</p>
                                                <p>Email: {user.email || 'NA'}</p>
                                            </div>
                                        )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    <div className='bg-white p-5 rounded mb-4'>
                        {
                            card && (
                                <div>
                                    <h4 className='text-lg mb-3 font-bold'>Card Details</h4>
                                    <p>Type: {card?.type}</p>
                                    {
                                        card.type == 'Membership' && (
                                            <p>Validity: {card?.expired_at}</p>
                                        )
                                    }

                                    {
                                        card.type == 'Gift' && (
                                            <div className='flex gap-3 items-center'>
                                                <p>Balance: ₦ {card?.amount}</p>
                                                <a className='text-sky-500 cursor-pointer underline' onClick={() => setCharging(!isCharging)}>Charge Card</a>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }

                        {
                            !isCharging && (
                                <form onSubmit={submit} className=''>
                                    <p className='text-red-500'>{error}</p>
                                    <div className="mt-4">
                                        <InputLabel value="Card Type" />
                                        <SelectInput
                                            id="card"
                                            name="card"
                                            value={data.card}
                                            className="mt-1 block w-full"
                                            onChange={onHandleChange}
                                            required
                                            options={['Gift', 'Membership']}
                                        />

                                        {/* <InputError message={errors.card} className="mt-2" /> */}
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel value="Code" />

                                        <TextInput
                                            id="code"
                                            type="text"
                                            name="code"
                                            value={data.code}
                                            className="mt-1 block w-full"
                                            onChange={onHandleChange}
                                            required
                                        />

                                        {/* <InputError message={errors.code} className="mt-2" /> */}
                                    </div>

                                    <div className="flex items-center justify-end mt-10">
                                        <button className='px-10 bg-amber-500 rounded p-2 text-white' disabled={processing}>
                                            Scan
                                        </button>
                                        {/* <PrimaryButton className="ml-4 bg-amber-500 px-10" disabled={processing}>
                                            Scan
                                        </PrimaryButton> */}
                                    </div>
                                </form>
                            )
                        }

                        {
                            isCharging && (
                                <form onSubmit={charge}>
                                    <div className="mt-4">
                                        <InputLabel value="Service Cost" />
                                        <TextInput
                                            id="price"
                                            type="number"
                                            name="price"
                                            className="mt-1 block w-full"
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <p className='text-red-500'>{error}</p>
                                    <p className='text-green-500'>{message}</p>

                                    <div className="flex items-center justify-end mt-4">
                                        <button className='px-10 bg-red-500 rounded p-2 text-white' disabled={processing}>
                                            Charge
                                        </button>
                                        {/* <PrimaryButton className="bg-amber-500 px-10" disabled={processing}>
                                            Charge
                                        </PrimaryButton> */}
                                    </div>
                                </form>
                            )
                        }
                    </div>

                    {
                        card?.transactions && (
                            <div className="bg-white overflow-hidden shadow-sm mx-4 lg:mx-0 rounded">
                                <div className="p-3 text-gray-900 flex justify-between items-center">
                                    <h1>Transactions</h1>
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
                                                card.transactions.map((model, index) => {
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
                                                card.transactions.length == 0 && (<tr>
                                                    <td className='text-center pt-5' colSpan={8}>No Records Found</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
