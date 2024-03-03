import TextInput from "@/Components/TextInput.jsx"
import { useForm } from "@inertiajs/react"
import InputError from "@/Components/InputError.jsx"
import { Transition } from "@headlessui/react"

export default function GalleryForm({ getGalleries }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: "",
        password: ""
    })

    const submit = (e) => {
        e.preventDefault()
        post(route("admin.gallery.store"))

        setTimeout(() => {
            setData({
                name: "",
                password: ""
            })

            getGalleries()
        }, 1000)
    }

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="flex w-2/3 items-center border-b border-orange-600 py-2">
                <TextInput
                    label="Gallery Name"
                    name="gallery_name"
                    type="text"
                    required={true}
                    placeholder={"Enter gallery name"}
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    isFocused
                    className={"appearance-none bg-transparent border-none text-gray-700 mr-3 w-full"}
                />
                <TextInput
                    label="Gallery Name"
                    name="password"
                    type="password"
                    required={false}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder={"Enter Password (optional)"}
                    className={"appearance-none bg-transparent border-none text-gray-700 mr-3 w-full"}
                />
                <button
                    className="flex-shrink-0 bg-orange-500 hover:bg-orange-700 hover:border-orange-700 text-lg text-white py-1 px-2 rounded"
                    type="submit"
                >
                    Create Gallery
                </button>
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600 ml-3">Saved.</p>
                </Transition>
            </div>
            <small className="text-gray-600">Leave Password empty for public gallery.</small>
            <InputError className="mt-2" message={errors.name} />
            <InputError className="mt-2" message={errors.password} />
        </form>
    )
}
