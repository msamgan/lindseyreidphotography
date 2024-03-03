import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import PricingCard from "@/Pages/Backend/Components/PricingCard.jsx"
import { useEffect, useState } from "react"

export default function Pricing({ auth }) {
    const [packages, setPackages] = useState([])

    useEffect(() => {
        axios(route("admin.pricing.packages")).then((response) => {
            setPackages(response.data)
        })
    }, [])

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
