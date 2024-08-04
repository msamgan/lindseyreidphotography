import FrontLayout from "@/Layouts/FrontLayout.jsx"
import TextInput from "@/Components/TextInput.jsx"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { Head } from "@inertiajs/react"
import { useState } from "react"
import InputError from "@/Components/InputError.jsx"

export default function ViewGalleryPassword({ gallery }) {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: "post",
            url: route("gallery.password-check"),
            data: {
                gallery: gallery.uuid,
                password: password
            }
        })
            .then((response) => {
                if (response.data.status !== true) {
                    setError(response.data.message)
                    setTimeout(() => {
                        setError("")
                    }, 3000)

                    return
                }

                localStorage.setItem("token", response.data.token)
                window.location.href = route("gallery.view", {
                    gallery: gallery.uuid,
                    token: response.data.token
                })
            })
            .catch((error) => {
                // console.log(error)
            })
    }

    return (
        <FrontLayout>
            <Head title="Enter Password" />
            <section className="bg-white text-gray-800">
                <div className="container px-4 mx-auto text-center">
                    <InputError className={"text-2xl mb-3"} message={error} />
                    <div className="">
                        <h2>Enter the password to view this gallery</h2>
                        <form onSubmit={handleSubmit} className={"flex flex-col items-center"}>
                            <TextInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={"mt-2 w-1/2"}
                                type="password"
                                placeholder="Password"
                            />
                            <PrimaryButton className={"mt-3 w-1/2 mb-8"} type="submit">
                                Submit
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </section>
        </FrontLayout>
    )
}
