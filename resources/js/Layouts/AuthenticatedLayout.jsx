import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-black border-b border-yellow-600/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-3">
                                <img src="/images/BonAppétit-logo.png" alt="BonAppétit" className="h-8" />
                                <span className="text-white text-xl font-serif tracking-wider">BonAppétit</span>
                            </Link>

                            <div className="hidden space-x-6 sm:ms-10 sm:flex">
                                {user.role === 'admin' ? (
                                    <>
                                        <NavLink
                                            href={route('admin.dashboard')}
                                            active={route().current('admin.dashboard')}
                                            className="text-yellow-500 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            🔧 Panel Admin
                                        </NavLink>
                                        <NavLink
                                            href={route('admin.reservaciones')}
                                            active={route().current('admin.reservaciones')}
                                            className="text-yellow-500 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            📅 Gestión Reservaciones
                                        </NavLink>
                                        <NavLink
                                            href={route('admin.menu')}
                                            active={route().current('admin.menu')}
                                            className="text-yellow-500 hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            🍽️ Gestión Menú
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink
                                            href={route('dashboard')}
                                            active={route().current('dashboard')}
                                            className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            Dashboard
                                        </NavLink>
                                        <NavLink
                                            href={route('recetas')}
                                            active={route().current('recetas')}
                                            className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            Recetas
                                        </NavLink>
                                        <NavLink
                                            href={route('favoritas')}
                                            active={route().current('favoritas')}
                                            className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            Mis Favoritas
                                        </NavLink>
                                        <NavLink
                                            href={route('reservaciones')}
                                            active={route().current('reservaciones')}
                                            className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors"
                                        >
                                            Reservaciones
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors">
                                        <span className="mr-2">{user.name}</span>
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="text-gray-300 hover:text-yellow-500 p-2"
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

                {/* Mobile menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-gray-900'}>
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {user.role === 'admin' ? (
                            <>
                                <ResponsiveNavLink
                                    href={route('admin.dashboard')}
                                    active={route().current('admin.dashboard')}
                                    className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium"
                                >
                                    Panel Admin
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('admin.reservaciones')}
                                    active={route().current('admin.reservaciones')}
                                    className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium"
                                >
                                    Reservaciones
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('admin.menu')}
                                    active={route().current('admin.menu')}
                                    className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium"
                                >
                                    Menú
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <>
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium"
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('recetas')}
                                    active={route().current('recetas')}
                                    className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium"
                                >
                                    Recetas
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('favoritas')}
                                    active={route().current('favoritas')}
                                    className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium"
                                >
                                    Mis Favoritas
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('reservaciones')}
                                    active={route().current('reservaciones')}
                                    className="text-gray-300 hover:text-yellow-500 block px-3 py-2 text-base font-medium"
                                >
                                    Reservaciones
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="border-t border-yellow-600/30 pb-3 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-gray-400">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1 px-2">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-gray-300 hover:text-yellow-500">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-gray-300 hover:text-yellow-500">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
