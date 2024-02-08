import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import PricingCard from "@/Pages/Backend/Components/PricingCard.jsx"

export default function Pricing({ auth, packages }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pricing</h2>}
        >
            <Head title="Pricing" />

            <div className="py-12">
                <div className="container mx-auto grid grid-cols-3 gap-1">
                    {packages.map((pack, index) => {
                        return <PricingCard pack={pack} key={index} />
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
