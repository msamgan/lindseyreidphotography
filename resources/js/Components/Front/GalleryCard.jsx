import { Link } from "@inertiajs/react"

export default function GalleryCard({ gallery }) {
    return (
        <div className="max-w-md p-2 mt-12 rounded-md shadow-md bg-gray-50 text-gray-900">
            <img
                src={gallery.cover ? "/" + gallery.cover : "/img/lr_white.png"}
                alt=""
                className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
            />
            <div className="mt-6 mb-2">
                <Link href={route("gallery.view", {
                    gallery: gallery.uuid
                })}>
                    <h2 className="text-2xl font-semibold tracki ml-4">{gallery.name}</h2>
                </Link>
            </div>
        </div>
    )
}
