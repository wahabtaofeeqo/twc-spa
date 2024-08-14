import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function OutletForm({onCreated}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        address: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('outlets.create'), {
            onSuccess: () => {
                reset();
                onCreated(true)
            },
        });
    };

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
                    <InputLabel value="Address" />

                    <TextInput
                        id="address"
                        type="text"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Manager's Email" />
                    <p className='text-slate-500 text-sm'>
                        This email must belong to an existing Admin User.
                    </p>
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

                <div className="flex items-center justify-end mt-10">
                    <PrimaryButton className="ml-4 bg-amber-500" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>
    );
}
