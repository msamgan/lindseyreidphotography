import FrontLayout from "@/Layouts/FrontLayout.jsx"
import { useEffect, useState } from "react"
import Loader from "@/Components/Loader.jsx"
import GalleryCard from "@/Components/Front/GalleryCard.jsx"

export default function Gallery() {
    const [galleries, setGalleries] = useState([])
    const [loading, setLoading] = useState(false)

    const getGallery = () => {
        axios.get(route("gallery.all")).then((response) => {
            setLoading(false)
            setGalleries(response.data)
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
                    {
                        loading ? <Loader /> : <div className="container mx-auto grid grid-cols-3 gap-1">
                            {galleries.length > 0 &&
                                galleries.map((gallery, index) => (
                                    <GalleryCard
                                        key={index}
                                        gallery={gallery} />
                                ))}
                        </div>
                    }
                </div>
            </section>
        </FrontLayout>
    )
}
