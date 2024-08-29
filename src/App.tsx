import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./Router";
import { AnimalProvider } from "./components/AnimalContext";

function App() {

  return (
    <>
      <AnimalProvider>
        <RouterProvider router={router}></RouterProvider>
      </AnimalProvider>
    </>
  )
}

export default App
