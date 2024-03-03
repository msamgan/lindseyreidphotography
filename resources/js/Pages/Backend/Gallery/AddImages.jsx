import { Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx"
import { FilePond } from "react-filepond"
import { useState } from "react"
import "filepond/dist/filepond.min.css"


export default function AddImages({ auth, gallery }) {

    const [files, setFiles] = useState([])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Gallery Images | {gallery.name}
            </h2>}
        >
            <Head title="Gallery Images" />

            <div className="filepond-wrapper p-6">
                <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    server={{
                        url: route("admin.image.store"),
                        process: {
                            headers: {},
                            onload: (response) => {
                                axios.post(route("admin.gallery.image.store", {
                                    gallery_uuid: gallery.uuid
                                }), {
                                    image: JSON.parse(response).image
                                }).then(() => {
                                })
                            },
                            onerror: (response) => {
                                console.log(response)
                            }
                        }
                    }}
                    name="file"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
            </div>

        </AuthenticatedLayout>
    )

}
