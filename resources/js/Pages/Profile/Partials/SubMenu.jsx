import NavLink from "@/Components/NavLink.jsx"

export default function SubMenu() {
    return (
        <>
            <li className="flex">
                <NavLink href={route("profile.edit")} className={""} active={route().current("profile.edit")}>
                    Profile
                </NavLink>
            </li>
            <li className="flex">
                <NavLink
                    href={route("profile.settings")}
                    className={""}
                    active={route().current("profile.settings")}
                >
                    Settings
                </NavLink>
            </li>
            {/*<li className="flex">
                <NavLink
                    href={route("profile.danger")}
                    className={""}
                    active={route().current("profile.danger")}
                >
                    Danger Zone
                </NavLink>
            </li>*/}
        </>
    )
}
