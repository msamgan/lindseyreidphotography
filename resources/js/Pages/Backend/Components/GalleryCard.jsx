import { dateFormatter } from "@/methods.js"
import { Link } from "@inertiajs/react"

const EditGallery = ({ gallery }) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
            </svg>
        </div>
    )
}

const AddImages = ({ gallery }) => {
    return (
        <div>
            <Link href={route("admin.gallery.add-images", {
                gallery: gallery.uuid
            })}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-4 cursor-pointer"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Link>
        </div>
    )
}

const ViewImages = ({ gallery }) => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-4 cursor-pointer"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
            </svg>
        </div>
    )
}

const IsPrivate = () => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
            </svg>
        </div>
    )
}

export default function GalleryCard({ gallery }) {
    return (
        <div className="max-w-xs p-2 mt-12 rounded-md shadow-md bg-gray-50 text-gray-900">
            <img
                src={
                    gallery.images.length > 0
                        ? ("/" + gallery.images[0].link)
                        : "https://via.placeholder.com/300x200"
                }
                alt=""
                className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
            />
            <div className="mt-6 mb-2">
                <span className="block text-lg font-medium tracki uppercase text-orange-600 mb-2 m-4">
                    {dateFormatter(gallery.created_at)}
                </span>
                <h2 className="text-2xl font-semibold tracki m-4">{gallery.name}</h2>
                <hr className={"mt-3 mb-3"} />
                <div className={"flex flex-row ml-4 mt-4"}>
                    <EditGallery gallery={gallery} />
                    <AddImages gallery={gallery} />
                    <ViewImages gallery={gallery} />
                    {gallery.password !== null ? <IsPrivate /> : null}
                </div>
            </div>
        </div>
    )
}
