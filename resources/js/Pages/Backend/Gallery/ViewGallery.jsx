import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { useEffect, useState } from "react"
import { Head } from "@inertiajs/react"
import Loader from "@/Components/Loader.jsx"
import { Gallery } from "react-grid-gallery"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

export default function GalleryCard({ auth, gallery }) {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [index, setIndex] = useState(-1)
    const [lightBoxImages, setLightBoxImages] = useState([])

    const getImages = () => {
        axios(
            route("admin.gallery.images", {
                gallery: gallery.uuid
            })
        ).then((response) => {
            setLoading(false)
            setImages(response.data.images)
            setLightBoxImages(
                response.data.images.map((image) => {
                    return {
                        src: image.original,
                        width: image.width,
                        height: image.height
                    }
                })
            )
        })
    }

    const handleClickedImage = (index, image) => {
        setIndex(index)
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
                            <div className="text-left text-gray-800 text-3xl font-semibold ml-4 mb-6 sunydale">
                                Total Images: {images.length}
                            </div>

                            <Gallery
                                images={images}
                                onClick={handleClickedImage}
                                enableImageSelection={false}
                                rowHeight={400}
                            />

                            <Lightbox
                                slides={lightBoxImages}
                                plugins={[Fullscreen, Zoom]}
                                open={index >= 0}
                                index={index}
                                close={() => setIndex(-1)}
                            />
                        </section>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
