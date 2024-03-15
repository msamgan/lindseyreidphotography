import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { useEffect, useState } from "react"
import { Head } from "@inertiajs/react"
import Loader from "@/Components/Loader.jsx"
import { Gallery } from "react-grid-gallery"


export default function GalleryCard({ auth, gallery }) {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    const getImages = () => {
        axios(
            route("admin.gallery.images", {
                gallery: gallery.uuid
            })
        ).then((response) => {
            setLoading(false)
            setImages(response.data.images)
        })
    }

    useEffect(() => {
        setLoading(true)
        getImages()
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gallery Images | {gallery.name}
                </h2>
            }
        >
            <Head title="Gallery Images" />

            <div className="py-12">
                <div className="container mx-auto">
                    {loading ? (
                        <Loader />
                    ) : (
                        <section className="py-6 bg-gray-100">
                            <div className="text-left text-gray-800 text-xl font-semibold ml-4">
                                Total Images: {images.length}
                            </div>

                            <Gallery images={images} rowHeight={600} />
                        </section>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
