import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    // useForm is een super handige hook van Inertia voor formulieren
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        next_payment_date: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("subscriptions.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Nieuw Abonnement
                </h2>
            }
        >
            <Head title="Nieuw Abonnement" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg p-6 transition-colors">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Naam Veld */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Naam van de service"
                                />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    placeholder="Bijv. Netflix"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            {/* Prijs Veld */}
                            <div>
                                <InputLabel
                                    htmlFor="price"
                                    value="Prijs per maand (€)"
                                />
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
                                    placeholder="0.00"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>

                            {/* Datum Veld */}
                            <div>
                                <InputLabel
                                    htmlFor="next_payment_date"
                                    value="Eerstvolgende betaaldatum"
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

                            {/* Knoppen */}
                            <div className="flex items-center justify-end gap-4">
                                <a
                                    href={route("dashboard")}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline"
                                >
                                    Annuleren
                                </a>

                                <PrimaryButton disabled={processing}>
                                    Opslaan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
