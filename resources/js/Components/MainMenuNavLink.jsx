import { Link } from "@inertiajs/react"

export default function MainMenuNavLink({ active = false, className = "", children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-white " +
                className
            }
        >
            <span
                className={active ? "bg-white p-2 rounded-md text-black" : "hover:bg-white hover:text-black p-2 rounded-md"}>
                {children}
            </span>
        </Link>
    )
}
