import { useState } from "react"
import HyphenSvg from "@/Components/svgs/hyphenSvg.jsx"
import EditSave from "@/Pages/Backend/Components/EditSave.jsx"

export default function PricingCard({ pack }) {
    const [price, setPrice] = useState(pack.price)
    const [name, setName] = useState(pack.name)
    const [editing, setEditing] = useState(false)
    const [editStatus, setEditStatus] = useState("")

    const updatePrice = () => {
        axios
            .post(route("admin.pricing.update"), {
                package_id: pack.id,
                price: price
            })
            .then((response) => {
                setEditStatus("Saved!")
            })
            .catch((error) => {
                setEditStatus("Error!")
            })
    }

    return (
        <div className="p-4 m-4 shadow-md bg-gray-50 text-gray-800">
            <div className="space-y-4">
                <div className="space-y-2">
                    <EditSave
                        className={"mb-2"}
                        displayHtml={<h3 className="text-xl font-semibold text-orange-600">{name}</h3>}
                        displayData={name}
                        dataUpdateSetter={setName}
                        updateRoute={route("admin.name.update")}
                        updateId={pack.id}
                    />

                    <EditSave
                        displayHtml={<h2 className={"text-4xl font-bold lg:text-5xl"}>${price}</h2>}
                        displayData={price}
                        dataUpdateSetter={setPrice}
                        updateRoute={route("admin.pricing.update")}
                        updateId={pack.id}
                    />

                    {pack.package_services.map((service, serviceIndex) => {
                        return (
                            <p className="leadi text-gray-600 flex flex-row" key={serviceIndex}>
                                <HyphenSvg className="w-6 h-6 mt-1 mr-1" />
                                <span className="text-lg">{service.details}</span>
                            </p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
