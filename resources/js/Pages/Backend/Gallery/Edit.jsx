import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { Head, useForm } from "@inertiajs/react"
import GalleryForm from "@/Pages/Backend/Components/GalleryForm.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { useEffect } from "react"
import { dateToNumberOfDays } from "@/methods.js"

export default function GalleryCreate({ auth, gallery }) {
    let formObject = {
        name: gallery.name,
        password: "",
        can_download: gallery.can_download,
        download_duration: dateToNumberOfDays(gallery.created_at, gallery.download_duration)
    }

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm(formObject)

    const submit = (e) => {
        e.preventDefault()
        post(
            route("admin.gallery.update", {
                gallery: gallery.uuid
            })
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Gallery</h2>}
        >
            <Head title="Create Gallery" />
            <div className="py-12">
                <div className="container mx-auto">
                    <form
                        noValidate=""
                        action=""
                        method="POST"
                        onSubmit={submit}
                        className="container flex flex-col mx-auto space-y-12"
                    >
                        <GalleryForm data={data} setData={setData} isPublic={gallery.is_public} />
                        <div className="col-span-full ml-6">
                            <PrimaryButton
                                type="submit"
                                className="flex-shrink-0 hover:bg-white hover:text-black hover:border-black text-lg text-white py-1 px-2 rounded"
                            >
                                Update Gallery
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
