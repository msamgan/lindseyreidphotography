import { dateFormatter, getPortfolioUuId } from "@/methods.js"
import { Link } from "@inertiajs/react"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"

const EditGallery = ({ gallery }) => {
    const [actionHtml, setActionHtml] = useState(<></>)
    useEffect(() => {
        if (gallery.uuid !== getPortfolioUuId()) {
            setActionHtml(
                <div>
                    <div className="has-tooltip">
                        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8">
                            Edit Gallery
                        </span>
                        <Link
                            href={route("admin.gallery.edit", {
                                gallery: gallery.uuid
                            })}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 cursor-pointer text-blue-800 hover:text-blue-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            )
        }
    }, [])

    return actionHtml
}

const AddImages = ({ gallery }) => {
    return (
        <div>
            <div className="has-tooltip">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8">
                    Add Images to Gallery
                </span>
                <Link
                    href={route("admin.gallery.add-images", {
                        gallery: gallery.uuid
                    })}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 ml-4 cursor-pointer text-green-800 hover:text-green-400"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

const ViewImages = ({ gallery }) => {
    return (
        <div className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8">
                View Images in Gallery
            </span>
            <Link
                href={route("admin.gallery.view", {
                    gallery: gallery.uuid
                })}
                className={"cursor-pointer"}
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 ml-4 cursor-pointer text-blue-800 hover:text-blue-400"
                    >
                        <path
                            d=" M8.25
                10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </Link>
        </div>
    )
}

const DeleteGallery = ({ gallery, getGalleries }) => {
    const [actionHtml, setActionHtml] = useState(<></>)
    useEffect(() => {
        if (gallery.uuid !== getPortfolioUuId()) {
            setActionHtml(
                <div className="has-tooltip">
                    <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8">
                        Delete Gallery
                    </span>
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
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 ml-4 cursor-pointer text-red-800 hover:text-red-400"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            )
        }
    }, [])

    return actionHtml
}

const IsPrivate = () => {
    return (
        <div>
            <div className="has-tooltip">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8">
                    This Gallery is Private
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 ml-4 cursor-pointer text-red-800"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    )
}

const CanDownload = ({ gallery }) => {
    return (
        <div>
            <div className="has-tooltip">
                <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8">
                    Downloadable till {dateFormatter(gallery.download_duration)}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    )
}

export default function GalleryCard({ gallery, getGalleries }) {
    return (
        <div className="max-w-md p-2 mt-12 rounded-md shadow-md bg-gray-50 text-gray-900">
            <img
                src={gallery.cover ? "/" + gallery.cover : "/img/lr_white.png"}
                alt=""
                className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
            />
            <div className="mt-6 mb-2">
                <div className={"flex flex-row gap-1"}>
                    <span className="block text-lg font-medium tracki uppercase text-black mb-2 mt-4 ml-4">
                        {dateFormatter(gallery.created_at)}
                    </span>

                    {gallery.is_public ? null : (
                        <span className="block text-lg font-medium tracki uppercase text-black mb-2 mt-4">
                            <IsPrivate />
                        </span>
                    )}
                    {gallery.can_download ? (
                        <span className="block text-lg font-medium tracki uppercase text-black mb-2 mt-4 ml-2">
                            <CanDownload gallery={gallery} />
                        </span>
                    ) : null}
                </div>
                <h2 className="text-2xl font-semibold tracki ml-4">{gallery.name}</h2>
                <hr className={"mt-3 mb-3"} />
                <div className={"flex flex-row ml-4 mt-4"}>
                    <EditGallery gallery={gallery} />
                    <AddImages gallery={gallery} />
                    <ViewImages gallery={gallery} />

                    <DeleteGallery gallery={gallery} getGalleries={getGalleries} />
                </div>
            </div>
        </div>
    )
}
