import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { useEffect, useState } from "react"
import { Head } from "@inertiajs/react"
import Loader from "@/Components/Loader.jsx"
import { Gallery } from "react-grid-gallery"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import DangerButton from "@/Components/DangerButton.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import Swal from "sweetalert2"

export default function GalleryCard({ auth, gallery }) {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [index, setIndex] = useState(-1)
    const [lightBoxImages, setLightBoxImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])

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

    const handleSelect = (index, item, event) => {
        const nextImages = images.map((image, i) =>
            i === index ? { ...image, isSelected: !image.isSelected } : image
        )

        setImages(nextImages)

        const selected = nextImages.filter((image) => image.isSelected)
        setSelectedImages(selected)
    }

    useEffect(() => {
        setLoading(true)
        getImages()
    }, [])


    useEffect(() => {
        console.log(selectedImages)
    }, [selectedImages])

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
                        <>
                            <div>
                                <div className="text-left text-gray-800 text-3xl font-semibold ml-4 mb-6 sunydale">
                                    Total Images: {images.length}
                                </div>
                            </div>
                            <div className="flex justify-end mb-4">
                                <DangerButton
                                    disabled={selectedImages.length === 0}
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            confirmButtonColor: "#d70707",
                                            showCancelButton: true,
                                            confirmButtonText: "Yes, delete it!",
                                            cancelButtonText: "No, cancel!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                axios
                                                    .delete(
                                                        route("admin.gallery.image.delete", {
                                                            images: selectedImages.map(
                                                                (image) => image.uuid
                                                            )
                                                        })
                                                    )
                                                    .then(() => {
                                                        getImages()
                                                    })
                                            }
                                        })
                                    }}
                                >
                                    Delete
                                </DangerButton>
                                <PrimaryButton
                                    disabled={selectedImages.length !== 1}
                                    className={"ml-3"}
                                    onClick={() => {
                                        console.log(selectedImages)
                                    }}
                                >
                                    Set as Cover
                                </PrimaryButton>
                            </div>
                            <section className="py-6">
                                <Gallery
                                    images={images}
                                    onClick={handleClickedImage}
                                    enableImageSelection={true}
                                    onSelect={handleSelect}
                                    rowHeight={400}
                                    margin={5}
                                />

                                <Lightbox
                                    slides={lightBoxImages}
                                    plugins={[Fullscreen, Zoom]}
                                    open={index >= 0}
                                    index={index}
                                    close={() => setIndex(-1)}
                                />
                            </section>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
