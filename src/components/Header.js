import { Link, useNavigate } from "react-router-dom"

const Header = ({ logo, token, setUser }) => {
	const navigate = useNavigate()
	return token ? (
		<div className="header container">
			<Link to={`/`}>
				{" "}
				<img className="logo" src={logo} alt="" />
			</Link>

			<button
				onClick={() => {
					setUser(null)
					navigate("/")
				}}
			>
				Se déconnecter
			</button>
		</div>
	) : (
		<div className="header container">
			<Link to={`/`}>
				<img className="logo" src={logo} alt="" />
			</Link>
			<Link to={`/signup`}>
				<button>S'incrire</button>
			</Link>
			<Link to={`/login`}>
				<button>Se connecter</button>
			</Link>
		</div>
	)
}

export default Header
