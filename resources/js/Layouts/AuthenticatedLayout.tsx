import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ auth, header, children, errors = null }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="h-screen bg-gray-100 relative">
            <div className='hidden lg:block fixed top-0 z-10 left-0 bottom-0 w-60 h-screen bg-amber-100'>
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="shrink-0 flex items-center w-full p-2 py-3 border-b">
                            <Link href="/" className='pr-2'>
                                <ApplicationLogo className="block h-8 w-auto fill-current" />
                            </Link>
                            {/* <strong>TaolSpa</strong> */}
                        </div>

                        <Link href={route('dashboard')} className={(route().current('dashboard') ? 'border-l-4 border-sky-500' : '') + ' block mt-4 hover:bg-gray-700 hover:text-white px-3 py-3 text-sm font-medium'}>
                            <i className='fa-solid fa-home mr-2'></i> Dashboard
                        </Link>
                        <Link href={route('users')} className={(route().current('users') ? 'border-l-4 border-sky-500' : '') + ' block hover:bg-gray-700 hover:text-white px-3 py-3 text-sm font-medium'}>
                            <i className='fa-solid fa-users mr-2'></i> Customers
                        </Link>

                       {
                        auth?.role?.includes('super admin') && <>
                            <Link href={route('outlets')} className={(route().current('outlets') ? 'border-l-4 border-sky-500' : '') + ' block hover:bg-gray-700 hover:text-white px-3 py-3 text-sm font-medium'}>
                                <i className="fa-solid fa-shop mr-2"></i> Outlets
                            </Link>
                            <Link href={route('admins')} className={(route().current('admins') ? 'border-l-4 border-sky-500' : '') + ' block hover:bg-gray-700 hover:text-white px-3 py-3 text-sm font-medium'}>
                                <i className="fas fa-user-tie mr-2"></i> Admins
                            </Link>
                            <Link href={route('transactions')} className={(route().current('transactions') ? 'border-l-4 border-sky-500' : '') + ' block hover:bg-gray-700 hover:text-white px-3 py-3 text-sm font-medium'}>
                                <i className="fas fa-money-bill mr-2"></i> Transactions
                            </Link>
                        </>
                       }
                        <Link href={route('scans')} className={(route().current('scans') ? 'border-l-4 border-sky-500' : '') + ' block hover:bg-gray-700 hover:text-white px-3 py-3 text-sm font-medium'}>
                            <i className="fa-regular fa-id-card mr-2"></i> Scan
                        </Link>
                    </div>

                    <div className='p-3'>
                        <Link as='button' href='logout' method='post' className='bg-white py-2 px-3 w-full rounded hover:bg-gray-500'>
                            <i className="fa-solid fa-power-off mr-2"></i> Logout
                        </Link>
                    </div>
                </div>
            </div>

            <main className='lg:ml-60 h-screen overflow-auto'>
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between lg:justify-end py-3">
                            <div className='lg:hidden flex items-center'>
                                <Link href="/" className='pr-2'>
                                    <ApplicationLogo className="block h-8 w-auto fill-current" />
                                </Link>
                                {/* <strong>Goodbeach</strong> */}
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                                    {auth?.user?.name}

                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor">

                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"/>
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {/* <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link> */}
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Logout
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('users')} active={route().current('users')}>
                                Customers
                            </ResponsiveNavLink>
                            {
                                auth?.role?.includes('super admin') && <>
                                    <ResponsiveNavLink href={route('outlets')} active={route().current('outlets')}>
                                        Outlets
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('admins')} active={route().current('admins')}>
                                        Admins
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('transactions')} active={route().current('transactions')}>
                                        Transactions
                                    </ResponsiveNavLink>
                                </>
                            }
                             <ResponsiveNavLink href={route('scans')} active={route().current('scans')}>
                                Scan
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {auth?.user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">{auth?.user?.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                {/* <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink> */}
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Logout
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {children}
            </main>
        </div>
    );
}
