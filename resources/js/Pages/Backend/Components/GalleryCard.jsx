import { dateFormatter } from "@/methods.js"
import { Link } from "@inertiajs/react"
import Swal from "sweetalert2"

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
            <Link
                href={route("admin.gallery.add-images", {
                    gallery: gallery.uuid
                })}
            >
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
        <Link
            href={route("admin.gallery.view", {
                gallery: gallery.uuid
            })}
            className={"cursor-pointer"}
        >
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
        </Link>
    )
}

const DeleteGallery = ({ gallery, getGalleries }) => {
    return (
        <div
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
                                route("admin.gallery.delete", {
                                    gallery: gallery.uuid
                                })
                            )
                            .then(() => {
                                getGalleries()
                            })
                    }
                })
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer text-red-800 ml-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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

export default function GalleryCard({ gallery, getGalleries }) {
    return (
        <div className="max-w-xs p-2 mt-12 rounded-md shadow-md bg-gray-50 text-gray-900">
            <img
                src={
                    gallery.images.length > 0
                        ? "/" + gallery.images[0].thumbnail_link
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

                    <DeleteGallery gallery={gallery} getGalleries={getGalleries} />
                </div>
            </div>
        </div>
    )
}
