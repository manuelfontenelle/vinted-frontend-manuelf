import "./App.css"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Cookies from "js-cookie"
// Pages
import Home from "./pages/Home"
import Offer from "./pages/Offer"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Publish from "./pages/Publish"
// Logo
import Logo from "./assets/logo.svg"
//Header
import Header from "./components/Header"

function App() {
	const [token, setToken] = useState(Cookies.get("userToken") || null)

	const setUser = (token) => {
		if (token) {
			// Gestion de cookie
			Cookies.set("userToken", token, { expires: 10 })
		} else {
			Cookies.remove("userToken")
		}

		setToken(token)
	}
	return (
		<Router>
			<Header setUser={setUser} token={token} logo={Logo} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/offer/:id" element={<Offer />} />
				<Route path="/signup" element={<SignUp setUser={setUser} />} />
				<Route path="/login" element={<Login setUser={setUser} />} />
				<Route path="/publish" element={<Publish token={token} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
