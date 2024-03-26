import { Head, Link } from "@inertiajs/react"
import Header from "@/Components/Front/Header.jsx"
import Footer from "@/Components/Front/Footer.jsx"
import { useEffect } from "react"

const appName = import.meta.env.VITE_APP_NAME || "Lindsey Reid Photography"

export default function FrontLayout({ auth, children, title }) {
    useEffect(() => {
        console.log(route().current())
    }, [])

    return (
        <>
            <Head title={title} />
            <div className={""}>
                <div className={" mx-auto text-center"}>
                    {route().current() === "welcome" ? (
                        <>
                            <Link href={"/"}>
                                <h1 className={"text-8xl dancing-script-heading mt-20 mb-4"}>{"Lindsey Reid Photography"}</h1>
                                <span className={"text-6xl organique mt-3"}>Where love meets light</span>
                            </Link>
                            <hr className={"mt-8"} />
                        </>
                    ) : (
                        <Link href={"/"}>
                            <img src={"/img/header.png"} alt={appName} className={"mx-auto w-full h-full"} />
                        </Link>
                    )}
                </div>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    )
}
