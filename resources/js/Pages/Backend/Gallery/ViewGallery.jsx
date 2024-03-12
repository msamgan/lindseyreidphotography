import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { useEffect, useState } from "react"
import { Head } from "@inertiajs/react"
import Swal from "sweetalert2"
import Loader from "@/Components/Loader.jsx"

export default function GalleryCard({ auth, gallery }) {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    const getImages = () => {
        axios(route("admin.gallery.images", {
            gallery: gallery.uuid
        })).then((response) => {
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Gallery Images | {gallery.name}
            </h2>}
        >
            <Head title="Gallery Images" />

            <div className="py-12">
                <div className="container mx-auto">
                    {
                        loading ? <Loader /> : (
                            <section className="py-6 bg-gray-100">
                                <div className="text-left text-gray-800 text-xl font-semibold ml-4">
                                    Total Images: {images.length}
                                </div>
                                <div className="container flex flex-col justify-center p-4 mx-auto">
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
                                        {
                                            images.length > 0 && images.map((image, index) => (
                                                <div>
                                                    <div
                                                        style={
                                                            {
                                                                position: "relative",
                                                                top: "48px",
                                                                left: "10px",
                                                                cursor: "pointer"
                                                            }
                                                        }
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: "Are you sure?",
                                                                text: "You won't be able to revert this!",
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#d70707",
                                                                confirmButtonText: "Yes, delete it!",
                                                                cancelButtonText: "No, cancel!"
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    axios.delete(route("admin.gallery.image.delete", {
                                                                        image: image.uuid
                                                                    })).then(() => {
                                                                        getImages()
                                                                    })
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24"
                                                             strokeWidth={1.5} stroke="currentColor"
                                                             className="w-10 h-10 cursor-pointer text-red-800">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </div>
                                                    <a href={"/" + image.link} key={index} className={"cursor-pointer"}
                                                       target={"_blank"}>
                                                        <img className="object-cover w-full bg-gray-500 aspect-square"
                                                             alt={image.uuid}
                                                             src={"/" + image.link} />
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </section>
                        )
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
