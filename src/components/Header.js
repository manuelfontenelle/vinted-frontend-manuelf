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
							className=" header-button button-login-signup button-deco"
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
							<button className=" header-button button-login-signup">
								S'incrire
							</button>
						</Link>
						<Link to={`/login`}>
							<button className="header-button button-login-signup">
								Se connecter
							</button>
						</Link>
					</>
				)}
				<Link to="/publish">
					<button className="header-button  button-sold">
						Vends tes articles
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Header
