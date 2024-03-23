import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function Dashboard({ auth }) {
    const [galleryCount, setGalleryCount] = useState(0)
    const [imageCount, setImageCount] = useState(0)
    const [packageCount, setPackageCount] = useState(0)

    const getGalleryCount = () => {
        axios.get(route("admin.gallery.count"))
            .then(response => {
                setGalleryCount(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const getImageCount = () => {
        axios.get(route("admin.gallery.image.count"))
            .then(response => {
                setImageCount(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const getPackageCount = () => {
        axios.get(route("admin.packages.count"))
            .then(response => {
                setPackageCount(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    useEffect(() => {
        getGalleryCount()
        getImageCount()
        getPackageCount()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="container mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-800">Welcome
                                        back, {auth.user.name}!</h1>
                                    <p className="text-gray-500">Here's a quick overview of your account.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Galleries</h2>
                                    <p className="text-gray-500">You have {galleryCount} galleries.</p>
                                </div>
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.target.innerHTML = "Refreshing..."
                                            setTimeout(() => {
                                                getGalleryCount()
                                                e.target.innerHTML = "Refresh"
                                            }, 1000)
                                        }}
                                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Images</h2>
                                    <p className="text-gray-500">You have {imageCount} images.</p>
                                </div>
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.target.innerHTML = "Refreshing..."
                                            setTimeout(() => {
                                                getImageCount()
                                                e.target.innerHTML = "Refresh"
                                            }, 1000)
                                        }}
                                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Packages</h2>
                                    <p className="text-gray-500">You have {packageCount} packages.</p>
                                </div>
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.target.innerHTML = "Refreshing..."
                                            setTimeout(() => {
                                                getPackageCount()
                                                e.target.innerHTML = "Refresh"
                                            }, 1000)
                                        }}
                                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
