import FrontLayout from "@/Layouts/FrontLayout.jsx"
import { useEffect, useState } from "react"
import Loader from "@/Components/Loader.jsx"
import { Link } from "@inertiajs/react"

export default function Gallery() {
    const [galleries, setGalleries] = useState([])
    const [loading, setLoading] = useState(false)

    const getGallery = () => {
        axios.get(route("gallery.public")).then((response) => {
            setLoading(false)
            setGalleries(response.data)

            console.log(response.data)
        })
    }

    useEffect(() => {
        setLoading(true)
        getGallery()
    }, [])

    return (
        <FrontLayout title={"Gallery"}>
            <section className="py-6 bg-gray-100">
                <div className="container flex flex-col justify-center p-4 mx-auto">
                    {/*<div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
                        {loading ? (
                            <Loader />
                        ) : (
                            galleries.map((gallery, index) => {
                                return (
                                    <div key={index}>
                                        <Link
                                            href={route("gallery.view", {
                                                gallery: gallery.uuid
                                            })}
                                        >
                                            <img
                                                className="object-cover w-full bg-gray-500 aspect-square mb-5"
                                                alt={gallery.name}
                                                src={gallery.images[0].thumbnail_link}
                                            />
                                        </Link>
                                        <span className="text-2xl font-bold sunydale">{gallery.name}</span>
                                    </div>
                                )
                            })
                        )}
                    </div>*/}
                </div>
            </section>
        </FrontLayout>
    )
}
