import { Head, Link } from "@inertiajs/react"
import Header from "@/Components/Front/Header.jsx"
import Footer from "@/Components/Front/Footer.jsx"

const appName = import.meta.env.VITE_APP_NAME || "Laravel"

export default function FrontLayout({ auth, children, title }) {
    return (
        <>
            <Head title={title} />
            <div className={""}>
                <div className={"max-w-7xl mx-auto text-center"}>
                    {/*<img src={"/img/lr_trans.png"} alt={appName} className={"mx-auto h-36"} />*/}
                    <Link href={"/"}>
                        <h1 className={"text-8xl dancing-script-heading mt-20 mb-2"}>{appName}</h1>
                        <span className={"text-4xl bhagnes mt-3 font-bold"}>
                            Where love meets light
                        </span>
                    </Link>
                    <hr className={"mt-8"} />
                </div>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    )
}
