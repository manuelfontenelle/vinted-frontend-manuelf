import { Link } from "react-router-dom"

const Hero = ({ HeroImg }) => {
	// const navigate = useNavigate()
	return (
		<div className="hero-container">
			<div className="container">
				<div className="hero-content">
					<div className="block-left">
						<h1>Prêts à faire du tri dans vos placards ?</h1>
						<Link className="block-left-link" to="/publish">
							<button>Vends maintenant</button>
						</Link>
					</div>
				</div>
			</div>
			<img className="hero-img" src={HeroImg} alt="" />
		</div>
	)
}

export default Hero
