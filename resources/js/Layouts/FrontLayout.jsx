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
                        <h1 className={"text-4xl dancing-script-heading mt-20 mb-20"}>{appName}</h1>
                    </Link>
                </div>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    )
}
