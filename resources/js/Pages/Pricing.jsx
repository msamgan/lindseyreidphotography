import FrontLayout from "@/Layouts/FrontLayout.jsx"
import { useEffect } from "react"

export default function Pricing({ primaryPackages, secondaryPackages }) {
    return (
        <FrontLayout title={"Pricing"}>
            <section className="bg-white text-gray-800">
                <div className="container px-4 mx-auto">
                    <div className="max-w-2xl mx-auto mb-16 text-center">
                        <h2 className="text-4xl font-bold lg:text-5xl">Wedding & Portraits</h2>
                    </div>
                    <div className="flex flex-wrap items-stretch -mx-4">
                        {primaryPackages.map((pack, index) => {
                            return (
                                <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0" key={index}>
                                    <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-gray-50">
                                        <div className="space-y-2">
                                            <h4 className="text-2xl font-bold sunydale mb-2">{pack.name}</h4>
                                            <span className="text-6xl font-bold">${pack.price}</span>
                                        </div>
                                        <ul className="flex-1 mb-6 text-gray-600">
                                            {pack.package_services.map((service, serviceIndex) => {
                                                return (
                                                    <li className="flex mb-2 space-x-2" key={serviceIndex}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M5 12h14"
                                                            />
                                                        </svg>
                                                        <span className={"text-lg"}>{service.details}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <p className="flex items-center justify-between p-6 border-l-8 sm:py-8 border-orange-600 bg-gray-50 text-gray-800 container px-4 mx-auto mt-12 text-2xl mb-12">
                    <span>
                        Contact us to discus which option will best fit your needs or to create a custom package
                    </span>
                </p>
            </section>

            <section className="py-6 bg-gray-100 text-gray-800">
                <div className="container p-4 mx-auto sm:p-10">
                    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-3 lg:max-w-full">
                        {secondaryPackages.map((pack, index) => {
                            return (
                                <div
                                    className="flex flex-col overflow-hidden border-2 rounded-md border-gray-300"
                                    key={index}
                                >
                                    <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 bg-gray-100">
                                        <p className="text-3xl font-medium sunydale">{pack.name}</p>
                                        <p className="text-5xl font-bold">
                                            ${pack.price}
                                            <span className="text-xl text-gray-600 ml-2">
                                                {pack.package_services[0].details}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 border-l-8 sm:py-8 border-orange-600 bg-gray-50 text-gray-800 container px-4 mx-auto mt-12 text-xl">
                    <span>
                        We Cover Destination Wedding!
                        <small className={"ml-2"}>Contact us for pricing.</small>
                    </span>
                </div>

                <div className="flex items-center justify-between p-6 border-l-8 sm:py-8 border-orange-600 bg-gray-50 text-gray-800 container px-4 mx-auto mt-12 text-xl">
                    <span>
                        Other Products
                        <small className={"ml-2"}>
                            We also offer Photo Books, Fine Art Albums, Canvas Prints, and Metallic Prints
                        </small>
                    </span>
                </div>
            </section>
        </FrontLayout>
    )
}
