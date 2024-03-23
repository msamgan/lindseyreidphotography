import { useEffect, useState } from "react"
import Dropdown from "@/Components/Dropdown"
import PrimaryButton from "@/Components/PrimaryButton.jsx"
import { Link } from "@inertiajs/react"
import MainMenuNavLink from "@/Components/MainMenuNavLink.jsx"

const mainMenu = [
    {
        name: "Dashboard",
        href: route("dashboard")
    },
    {
        name: "Pricing",
        href: route("admin.pricing")
    },
    {
        name: "Gallery",
        href: route("admin.gallery")
    }
]

export default function AuthenticatedLayout({ user, header, subMenu, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
    const [updatedMenu, setUpdatedMenu] = useState([])

    useEffect(() => {
        mainMenu.forEach((item) => {
            item.active = item.href === window.location.href
        })

        setUpdatedMenu(mainMenu)
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-black border-b border-gray-100">
                <div className="container mx-auto">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img
                                        className="block h-20 w-auto"
                                        src="/img/lr_white.PNG"
                                        alt="Workflow"
                                    />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {updatedMenu.map((item) => (
                                    <MainMenuNavLink key={item.name} href={item.href} active={item.active}>
                                        {item.name}
                                    </MainMenuNavLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <Link href={route("admin.gallery.create")}>
                                <PrimaryButton className="mr-3 bg-blue-600 hover:bg-blue-700">
                                    Add Gallery
                                </PrimaryButton>
                            </Link>

                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-lg leading-4 font-medium rounded-md bg-black text-white hover:bg-white hover:text-black focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                                        <hr />
                                        <Dropdown.Link href={route("logout")} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="p-4 bg-white text-gray-800">
                    <div className="container flex justify-between h-16 mx-auto">
                        <a
                            rel="noopener noreferrer"
                            aria-label="Back to homepage"
                            className="flex items-center p-2"
                        >
                            {header}
                        </a>
                        <ul className="items-stretch hidden space-x-3 md:flex">{subMenu}</ul>
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    )
}
