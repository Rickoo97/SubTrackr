import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ auth, subscription }) {
    // We vullen het formulier direct met de data uit de database
    const { data, setData, put, processing, errors } = useForm({
        name: subscription.name,
        price: subscription.price,
        next_payment_date: subscription.next_payment_date,
        status: subscription.status,
        category: subscription.category || "Overig",
    });

    const submit = (e) => {
        e.preventDefault();
        // Let op: we gebruiken hier 'put' in plaats van 'post' voor updates
        put(route("subscriptions.update", subscription.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Abonnement Wijzigen
                </h2>
            }
        >
            <Head title="Abonnement Wijzigen" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg p-6 transition-colors">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Naam */}
                            <div>
                                <InputLabel htmlFor="name" value="Naam" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            {/* Categorie Selectie */}
                            <div>
                                <InputLabel
                                    htmlFor="category"
                                    value="Categorie"
                                />
                                <select
                                    id="category"
                                    className="mt-1 block w-full border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                >
                                    <option value="Entertainment">
                                        Entertainment
                                    </option>
                                    <option value="Werk">Werk</option>
                                    <option value="Vervoer">Vervoer</option>
                                    <option value="Huis">Huis</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Overig">Overig</option>
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors.category}
                                />
                            </div>

                            {/* Prijs */}
                            <div>
                                <InputLabel htmlFor="price" value="Prijs (€)" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>

                            {/* Datum */}
                            <div>
                                <InputLabel
                                    htmlFor="next_payment_date"
                                    value="Volgende betaling"
                                />
                                <TextInput
                                    id="next_payment_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.next_payment_date}
                                    onChange={(e) =>
                                        setData(
                                            "next_payment_date",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.next_payment_date}
                                />
                            </div>

                            {/* Status Selectie */}
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="active">Actief</option>
                                    <option value="cancelled">Opgezegd</option>
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors.status}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                {/* Delete knop (Gevaarlijk rood) */}
                                <Link
                                    href={route(
                                        "subscriptions.destroy",
                                        subscription.id,
                                    )}
                                    method="delete"
                                    as="button"
                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                    onClick={(e) => {
                                        if (
                                            !confirm(
                                                "Weet je zeker dat je dit wilt verwijderen?",
                                            )
                                        )
                                            e.preventDefault();
                                    }}
                                >
                                    Verwijderen
                                </Link>

                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route("dashboard")}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline"
                                    >
                                        Annuleren
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Opslaan
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
