import { NavLink, Outlet } from "react-router-dom"

export const Layout = () => {
    return <>
        <header>
            <ul>
                <li>
                <NavLink to="/">Hem</NavLink>
                </li>
                <li>
                <NavLink to="/about">Om</NavLink>
                </li>
                <li>
                <NavLink to="/animals">Djur</NavLink>
                </li>
            </ul>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>

        </footer>
    </>
}