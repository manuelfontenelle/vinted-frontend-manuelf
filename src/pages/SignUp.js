import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = ({ setUser }) => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [newsletter, setNewsletter] = useState(false)

	const [errorMessage, setErrorMessage] = useState("")

	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()
			const response = await axios.post(
				`https://vinted-backend-manuelf.herokuapp.com/user/signup`,
				// "http://localhost:3001/user/signup",
				{
					username: username,
					email: email,
					password: password,
					newsletter: newsletter,
				}
			)
			if (response.data.token) {
				// Sauvegarder le token dans un cookie
				setUser(response.data.token)
				// Rediriger le user vers "/"
				navigate("/")
			}
		} catch (error) {
			console.log("Signup Error ===> ", error.message)
			console.log("Catch error ===> ", error.response)
			if (error.response.status === 409) {
				setErrorMessage("Cet email a déjà un compte")
			}
		}
	}

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<input
					value={username}
					type="text"
					placeholder="username"
					onChange={(event) => setUsername(event.target.value)}
				/>
				<br />

				<input
					value={email}
					type="email"
					placeholder="email"
					onChange={(event) => setEmail(event.target.value)}
				/>
				<br />
				<input
					type="password"
					placeholder="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
				<br />
				<input
					type="checkbox"
					onChange={(event) => setNewsletter(event.target.checked)}
				/>
				<br />
				<input type="submit" value="S'inscrire" />
				<span>{errorMessage}</span>
			</form>
		</div>
	)
}

export default SignUp
