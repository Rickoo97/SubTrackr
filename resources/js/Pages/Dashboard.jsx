import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dropdown from "@/Components/Dropdown";
import { Head } from "@inertiajs/react";
import ThemeToggle from "@/Components/ThemeToggle"; // Importeer de knop
import { Link } from "@inertiajs/react";

export default function Dashboard({ auth, subscriptions }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "short",
        });
    };

    const totalMonthly = subscriptions
        .filter((sub) => sub.status === "active")
        .reduce((acc, sub) => acc + parseFloat(sub.price), 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            // We voegen de ThemeToggle toe aan de header
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Overzicht
                    </h2>
                    <ThemeToggle />
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* MAIN WRAPPER: Licht/Donker flexibel */}
            <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100 py-12 transition-colors duration-300">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Card 1 */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm dark:shadow-lg transition-colors">
                            <div className="text-gray-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                Maandelijkse lasten
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                                {formatCurrency(totalMonthly)}
                            </div>
                            <div className="text-emerald-500 dark:text-emerald-400 text-xs mt-2 flex items-center gap-1">
                                <span>● Stabiel</span>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm dark:shadow-lg transition-colors">
                            <div className="text-gray-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                Actieve Services
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                                {
                                    subscriptions.filter(
                                        (s) => s.status === "active",
                                    ).length
                                }
                            </div>
                            <div className="text-gray-500 dark:text-slate-500 text-xs mt-2">
                                Van de {subscriptions.length} totaal
                            </div>
                        </div>

                        {/* Card 3 (Primary Color blijft altijd gekleurd) */}
                        <div className="bg-indigo-600 dark:bg-indigo-600 rounded-xl border border-indigo-500 p-6 shadow-lg text-white">
                            <div className="text-indigo-100 text-xs font-bold uppercase tracking-wider">
                                Eerstvolgende afschrijving
                            </div>
                            {subscriptions.length > 0 ? (
                                <>
                                    <div className="text-3xl font-bold mt-2 text-white">
                                        {subscriptions[0].name}
                                    </div>
                                    <div className="text-indigo-100 text-sm mt-1">
                                        {formatCurrency(subscriptions[0].price)}{" "}
                                        op{" "}
                                        {formatDate(
                                            subscriptions[0].next_payment_date,
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-lg font-bold mt-2">
                                    Geen data
                                </div>
                            )}
                        </div>
                    </div>

                    {/* LIJST */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-xl overflow-hidden transition-colors">
                        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Mijn Abonnementen
                            </h3>
                            <Link
                                href={route("subscriptions.create")}
                                className="bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-200 dark:border-slate-600"
                            >
                                + Toevoegen
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-500 dark:text-slate-400">
                                <thead className="bg-gray-50 dark:bg-slate-900/50 text-gray-700 dark:text-slate-200 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Service</th>
                                        <th className="px-6 py-4">Kosten</th>
                                        <th className="px-6 py-4">
                                            Volgende betaling
                                        </th>
                                        <th className="px-6 py-4 text-right">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right">
                                            Acties
                                        </th>{" "}
                                        {/* Nieuwe kolomheader */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                    {subscriptions.map((sub) => (
                                        <tr
                                            key={sub.id}
                                            className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                                        >
                                            {/* 1. Service Naam & Logo */}
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-4">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-colors text-gray-900 dark:text-white ${sub.logo_color || "bg-gray-200 dark:bg-slate-600"}`}
                                                >
                                                    {sub.name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                {sub.name}
                                            </td>

                                            {/* 2. Prijs */}
                                            <td className="px-6 py-4 text-gray-900 dark:text-gray-300">
                                                {formatCurrency(sub.price)}
                                            </td>

                                            {/* 3. Datum */}
                                            <td className="px-6 py-4 text-gray-900 dark:text-gray-300">
                                                {formatDate(
                                                    sub.next_payment_date,
                                                )}
                                            </td>

                                            {/* 4. Status Badge */}
                                            <td className="px-6 py-4 text-right">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                                        sub.status === "active"
                                                            ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                                            : "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                                                    }`}
                                                >
                                                    {sub.status === "active"
                                                        ? "Actief"
                                                        : "Gestopt"}
                                                </span>
                                            </td>

                                            {/* 5. Het "3-Puntjes" Menu (Dropdown) */}
                                            <td className="px-6 py-4 text-right">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none">
                                                            {/* Icoontje: 3 verticale puntjes */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </Dropdown.Trigger>

                                                    <Dropdown.Content>
                                                        {/* Link naar Wijzigen */}
                                                        <Dropdown.Link
                                                            href={route(
                                                                "subscriptions.edit",
                                                                sub.id,
                                                            )}
                                                        >
                                                            Wijzigen
                                                        </Dropdown.Link>

                                                        {/* Link naar Verwijderen (Directe actie) */}
                                                        <Dropdown.Link
                                                            href={route(
                                                                "subscriptions.destroy",
                                                                sub.id,
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            Verwijderen
                                                        </Dropdown.Link>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
