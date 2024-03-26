import { Link } from "@inertiajs/react"

export default function Header() {
    const menu = () => {
        return [
            {
                label: "Gallery",
                name: route("gallery")
            },
            {
                label: "Pricing",
                name: route("pricing")
            },
            {
                label: "Contact",
                name: route("contact")
            }
        ]
    }

    return (
        <header className="bg-white text-gray-800 mb-8" style={{
            marginTop: route().current() === "welcome" ? "12px" : "-85px"
        }}>
            <div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
                <ul className="items-stretch hidden space-x-28 md:flex text-3xl">
                    {menu().map((menuItem, index) => {
                        return (
                            <li className="flex cursor-pointer hover:text-grey-900" key={index}>
                                <Link
                                    rel="noopener noreferrer"
                                    href={menuItem.name}
                                    className={
                                        route().current() === menuItem.label.toLowerCase()
                                            ? "flex items-center px-4 -mb-1 border-b-2 border-transparent sunydale"
                                            : "flex items-center px-4 -mb-1 border-b-2 border-transparent sunydale"
                                    }
                                >
                                    {menuItem.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <button title="Button" type="button" className="p-4 md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-800"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
            <hr className={"mt-4"} />
        </header>
    )
}
