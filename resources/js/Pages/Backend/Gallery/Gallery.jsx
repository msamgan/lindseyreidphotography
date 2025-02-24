import { Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { useEffect, useState } from "react"
import GalleryCard from "@/Pages/Backend/Components/GalleryCard.jsx"

export default function Gallery({ auth }) {
    const [galleries, setGalleries] = useState([])

    const getGalleries = () => {
        axios(route("admin.gallery.all")).then((response) => {
            setGalleries(response.data)
        })
    }

    useEffect(() => {
        getGalleries()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gallery</h2>}
        >
            <Head title="Gallery" />

            <div className="py-12">
                <div className="container mx-auto grid grid-cols-3 gap-1">
                    {galleries.length > 0 &&
                        galleries.map((gallery, index) => (
                            <GalleryCard key={index} gallery={gallery} getGalleries={getGalleries} />
                        ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
