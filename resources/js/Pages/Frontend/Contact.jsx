import FrontLayout from "@/Layouts/FrontLayout.jsx"

export default function Contact() {
    return (
        <FrontLayout title={"Contact"}>
            <div
                className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-white text-gray-800">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's talk!</h2>
                        <div className="text-gray-600">
                            <p>
                                We are always open to discussing new projects, creative ideas or opportunities to be
                                part of
                                your visions.
                            </p>
                        </div>
                    </div>
                    <img src={"/img/lindsey.png"} alt="" className="h-auto w-2/3 mt-4    rounded-md" />
                </div>
                <form noValidate="" className="space-y-8 mt-28">
                    <div>
                        <label htmlFor="name" className="text-sm">
                            Full name
                        </label>
                        <input id="name" type="text" placeholder="" className="w-full p-3 rounded bg-white" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm">
                            Email
                        </label>
                        <input id="email" type="email" className="w-full p-3 rounded bg-white" />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm">
                            Message
                        </label>
                        <textarea id="message" rows="3" className="w-full p-3 rounded bg-white"></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-sm font-bold tracki uppercase rounded bg-black text-gray-50"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </FrontLayout>
    )
}
