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
            setSelectedImages([])
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
                                                            images: selectedImages.map((image) => image.uuid)
                                                        })
                                                    )
                                                    .then(() => {
                                                        getImages()
                                                    })
                                            }
                                        })
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 cursor-pointer text-white"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </DangerButton>
                                <PrimaryButton
                                    disabled={selectedImages.length !== 1}
                                    className={"ml-3 hover:bg-blue-700"}
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You can change the cover image later!",
                                            icon: "warning",
                                            confirmButtonColor: "#0731d7",
                                            showCancelButton: true,
                                            confirmButtonText: "Yes, Update cover!",
                                            cancelButtonText: "No, cancel!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                axios
                                                    .put(
                                                        route("admin.gallery.image.cover-update", {
                                                            gallery: gallery.uuid,
                                                            image: selectedImages[0].uuid
                                                        })
                                                    )
                                                    .then(() => {
                                                        getImages()
                                                    })
                                            }
                                        })
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
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
