import { useState } from "react"
import { Link } from "react-router-dom"
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
		<div className="signup-container container">
			<h2>S'inscrire</h2>
			<form onSubmit={handleSubmit} class="signup-form">
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
				<div className="checkbox-container">
					<div>
						<input
							type="checkbox"
							onChange={(event) => setNewsletter(event.target.checked)}
						/>
						<span>S'inscrire à notre newsletter</span>
					</div>
					<p>
						En m'inscrivant je confirme avoir lu et accepté les Termes &amp;
						Conditions et Politique de Confidentialité de Vinted. Je confirme
						avoir au moins 18 ans.
					</p>
				</div>
				<br />
				<button type="submit" value="Se connecter">
					S'inscrire
				</button>
				<span>{errorMessage}</span>
			</form>
			<Link to={`/login`}>Tu as déjà un compte ? Connecte-toi !</Link>
		</div>
	)
}

export default SignUp
