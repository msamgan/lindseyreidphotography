import { Link } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function GalleryCard({ gallery }) {
    const [params, setParams] = useState({
        gallery: gallery.uuid
    })

    useEffect(() => {
        if (!gallery.is_public) {
            setParams({
                ...params,
                token: localStorage.getItem("token")
            })
        }
    }, [])

    return (
        <div className="max-w-md p-2 mt-12 rounded-md shadow-md bg-gray-50 text-gray-900">
            <img
                src={gallery.cover ? gallery.cover_link : "/img/lr_white.png"}
                alt=""
                className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
            />
            <div className="mt-6 mb-2">
                <Link href={route("gallery.view", params)}>
                    <h2 className="text-3xl font-semibold tracki ml-4 sunydale">{gallery.name}</h2>
                </Link>
            </div>
        </div>
    )
}
