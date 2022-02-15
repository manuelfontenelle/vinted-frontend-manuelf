import { Link, useNavigate } from "react-router-dom"

const Header = ({ logo, token, setUser }) => {
	const navigate = useNavigate()
	return (
		<div className="header-container">
			<div className="header container">
				{token ? (
					<>
						<Link to={`/`}>
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
					</>
				) : (
					<>
						<Link to={`/`}>
							<img className="logo" src={logo} alt="" />
						</Link>
						<Link to={`/signup`}>
							<button>S'incrire</button>
						</Link>
						<Link to={`/login`}>
							<button>Se connecter</button>
						</Link>
					</>
				)}
				<Link to="/publish">
					<button>Vends tes articles</button>
				</Link>
			</div>
		</div>
	)
}

export default Header
