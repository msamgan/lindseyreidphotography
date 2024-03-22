import FrontLayout from "@/Layouts/FrontLayout.jsx"
import { useForm } from "@inertiajs/react"
import { Transition } from "@headlessui/react"
import { useState } from "react"

export default function Contact() {
    const formObject = {
        name: "",
        email: "",
        phone: "",
        message: ""
    }

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm(formObject)

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        setIsSubmitDisabled(true)
        post(route("contact.store"))

        setTimeout(() => {
            setData(formObject)
            setIsSubmitDisabled(false)
        }, 2000)
    }

    return (
        <FrontLayout title={"Contact"}>
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-white text-gray-800">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's talk!</h2>
                        <div className="text-gray-600">
                            <p>
                                We are always open to discussing new projects, creative ideas or opportunities
                                to be part of your visions.
                            </p>
                        </div>
                    </div>
                    <img src={"/img/lindsey.png"} alt="" className="h-auto w-2/3 mt-4 rounded-md" />
                </div>
                <form onSubmit={submit} noValidate="" className="space-y-8 mt-28">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-2xl text-green-600">Request sent successfully</p>
                    </Transition>
                    <div>
                        <label htmlFor="name" className="text-sm">
                            Full name <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            id="name"
                            value={data.name}
                            required={true}
                            onChange={(e) => setData("name", e.target.value)}
                            type="text"
                            placeholder=""
                            className="w-full p-3 rounded bg-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm">
                            Email
                        </label>
                        <input
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            type="email"
                            className="w-full p-3 rounded bg-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="text-sm">
                            Phone <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            type="text"
                            className="w-full p-3 rounded bg-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm">
                            Message <sup className="text-red-500">*</sup>
                        </label>
                        <textarea
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            id="message"
                            rows="3"
                            className="w-full p-3 rounded bg-white"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-black text-gray-50"
                        disabled={isSubmitDisabled}
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </FrontLayout>
    )
}
