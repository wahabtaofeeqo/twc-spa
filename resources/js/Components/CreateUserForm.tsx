import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import SelectInput from './SelectInput';

export default function CreateUserForm({onCreated, user}) {

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        category: '',
        code: '',
        card: '',
        amount: 0
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        const option = {
            onSuccess: () => {
                reset();
                onCreated(true)
            }
        }

        if(!user) post('create-user', option)
        else put(`/users/${user.id}`, option);
    };

    useEffect(() => {
        if(user) setData(user)
    }, []);

    return (
            <form onSubmit={submit}>
                <div>
                    <InputLabel value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Phone" />

                    <TextInput
                        id="phone"
                        type="text"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

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

                    <InputError message={errors.card} className="mt-2" />
                </div>

                {
                    data.card == 'Gift' &&
                        <div className="mt-4">
                           <InputLabel value="Amout" />
                            <TextInput
                                id="amount"
                                name="amount"
                                value={data.amount}
                                className="mt-1 block w-full"
                                onChange={onHandleChange}
                                required
                            />

                            <InputError message={errors.amount} className="mt-2" />
                        </div>
                }

                {
                    data.card == 'Membership' && (
                        <div className="mt-4">
                            <InputLabel value="Category" />
                            <SelectInput
                                id="category"
                                name="category"
                                value={data.category}
                                className="mt-1 block w-full"
                                onChange={onHandleChange}
                                required
                                options={['Gold', 'Silver', 'Platinum']}
                            />

                            <InputError message={errors.category} className="mt-2" />
                        </div>
                    )
                }

                <div className="mt-4">
                    <InputLabel value="Code" />
                    <TextInput
                        id="code"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-10">
                    <PrimaryButton className="ml-4 bg-amber-500" disabled={processing}>
                        {user ? 'Update' : 'Create'}
                    </PrimaryButton>
                </div>
            </form>
    );
}
