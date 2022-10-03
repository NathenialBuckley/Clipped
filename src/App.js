import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./components/views/Authorized";
import { ApplicationViews } from "./components/views/ApplicationViews";
import Home, { NavBar } from "./components/nav/NavBar";



export const App = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
      <Authorized>
        <>
          {/* <Home /> */}
          <NavBar />
          <ApplicationViews />
        </>
      </Authorized>

    } />
  </Routes>
}

// export default App;
