import ApplicationLogo from "@/Components/ApplicationLogo"
import { Head, Link } from "@inertiajs/react"

const Index = () => {
    return (
        <>
        <Head title="Best Event Center in Nigeria" />
        <div className="min-h-screen py-5 bg-amber-100">
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center justify-between">
                    <Link href="route('login')"
                        className="rounded-md px-3 flex items-center gap-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        {/* <ApplicationLogo className="block h-9 w-auto fill-current text-center" /> */}
                        <span className="font-bold text-2xl">TaolSpa</span>
                    </Link>

                    <div>
                        {/* <Link href="route('login')"
                            className="rounded-md font-bold px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Gallery
                        </Link> */}

                        <Link href={route('index')}
                            className="rounded-md font-bold px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            <i className="fa-brands fa-facebook"></i>
                        </Link>

                        <Link href={route('index')}
                            className="rounded-md font-bold px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            <i className="fa-brands fa-instagram"></i>
                        </Link>

                        <Link href={route('index')}
                            className="rounded-md font-bold px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            <i className="fa-brands fa-twitter"></i>
                        </Link>

                        {/* <Link href="route('dashboard')"
                            className="rounded-md font-bold px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Dashboard
                        </Link> */}
                    </div>
                </nav>

                <div className="main flex items-center p-3 py-5">
                    <div className="lg:w-2/4">
                        <h4 className="font-bold text-xl mb-10 text-light">Welcome to TaolSpa!</h4>

                        <p className="text-5xl lg:text-8xl font-black mb-8">
                            Rejuvenated Body & Soul
                        </p>

                        <p className="text-xl text-slate-500 mb-14">
                            Smile is the most beautiful curve on a woman's body.
                        </p>

                        <div>
                            <button className="py-2 px-6 bg-white rounded-0 shadow-sm text-black text-lg">
                            <i className="fa-solid fa-arrow-right me-2"></i> Book An Appointment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Index;
