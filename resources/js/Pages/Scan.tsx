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
import { useState } from 'react';

export default function Scan({auth, csrf}) {

    const [card, setCard] = useState<any>(null);
    const [error, setError] = useState<any>('');
    const [message, setMessage] = useState<any>('');
    const [isCharging, setCharging] = useState(false);
    const [processing, setProcessing] = useState(false);

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

        axios.post(route('scans.scan'), data).then(res => {
            setCard(res.data.card);
            setProcessing(false);
        }).catch(err => {
            setProcessing(false);
            setError(err?.response?.data?.message || 'Something went wrong. Please try again');
        })
    };

    const charge = (e) => {
        e.preventDefault();

        setError('');
        setMessage('');
        setProcessing(true);

        let payload = {
            ...chargeData,
            card_id: card.id
        }

        let headers: any = {
            'X-CSRF-TOKEN': csrf
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
                    setCharging(false);
                    setProcessing(false);
                }, 5000);
            },
            onError: e => {
                console.log(e);
            }
        });

        // axios.post(route('charge'), payload, {headers}).then(res => {
        //     let updatedCard = {
        //         ...card,
        //         amount: card.amount - chargeData.price
        //     }
        //     setCard(updatedCard);
        //     setMessage('Card successfully charged');
        //     setTimeout(() => {
        //         reset();
        //         setCard(null);
        //         setCharging(false);
        //         setProcessing(false);
        //     }, 5000);
        // }).catch(err => {
        //     setProcessing(false);
        //     setError(err?.response?.data?.message || 'Something went wrong. Please try again');
        // })
    };

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
                    <div className='bg-white p-5 rounded'>
                        {
                            card && (
                                <div>
                                    <h4 className='text-lg mb-3 font-bold'>Card Details</h4>
                                    <p>Name: {card?.user?.name}</p>
                                    <p>Phone: {card?.user?.phone}</p>
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

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
