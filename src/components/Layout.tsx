import { Outlet } from "react-router-dom"
import { Navigation } from "./Navigation"

// Layout-komponent som innehåller Navigation och renderar de inre komponenterna via Outlet
export const Layout = () => {

  return <>
    <header>
      <Navigation></Navigation> {/* Navigationsmeny högst upp på sidan */}
    </header>
    <main>
      <Outlet></Outlet> {/* Plats för renderade sidor */}
    </main>
    <footer></footer>
  </>

}