import TextInput from "@/Components/TextInput.jsx"
import { useState } from "react"

export default function PricingCard({ pack }) {
    const [price, setPrice] = useState(pack.price)
    const [editing, setEditing] = useState(false)
    const [editStatus, setEditStatus] = useState("")

    const updatePrice = () => {
        axios.post(route("admin.pricing.update"), {
            package_id: pack.id,
            price: price
        }).then((response) => {
            setEditStatus("Saved!")
        }).catch((error) => {
                setEditStatus("Error!")
            }
        )
    }

    return (
        <div className="p-4 m-4 shadow-md bg-gray-50 text-gray-800">
            <div className="space-y-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-orange-600 mb-4">{pack.name}</h3>

                    {/*Not Editing Section*/}
                    <div className={editing ? "hidden" : "show" + " flex flex-row"}>
                        <h2 className={"text-4xl font-bold lg:text-5xl"}>${price}</h2>
                        <button
                            title={"Edit Price"}
                            className=""
                            onClick={() => {
                                setEditing(!editing)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 ml-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                        </button>
                        <span className="ml-2 mt-4 text-lg text-gray-500">{editStatus}</span>
                    </div>

                    {/*Editing Section*/}
                    <div className={editing ? "show" : "hidden" + " flex flex-row"}>
                        <TextInput
                            className={"text-2xl w-1/4"}
                            type="text"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />

                        <button
                            title={"Save Price"}
                            className=""
                            onClick={() => {
                                setEditing(!editing)

                                setEditStatus("Saving!")
                                updatePrice()
                                setTimeout(() => {
                                    setEditStatus("")
                                }, 2000)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 ml-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                />
                            </svg>
                        </button>
                    </div>
                    {pack.package_services.map((service, serviceIndex) => {
                        return (
                            <p className="leadi text-gray-600 flex flex-row" key={serviceIndex}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>
                                <span className="text-lg">{service.details}</span>
                            </p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
