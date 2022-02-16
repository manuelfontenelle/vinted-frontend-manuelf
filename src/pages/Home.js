import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

//Hero
import Hero from "../components/Hero"
//Img
import HeroImg from "../assets/hero.jpg"
import decoHero from "../assets/deco.svg"

const Home = () => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)

	const limit = 10

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				// "https://vinted-backend-manuelf.herokuapp.com/offers"
				// `https://vinted-backend-manuelf.herokuapp.com/offers?limit=${limit}&page=${page}`
				`http://localhost:3001/offers?limit=${limit}&page=${page}`
			)
			console.log(response.data)
			setData(response.data)
			setIsLoading(false)
		}
		fetchData()
	}, [page])

	return isLoading ? (
		<div>En cours de chargement...</div>
	) : (
		<>
			<Hero HeroImg={HeroImg} decoHero={decoHero} />
			<div className=" container">
				<h1 className="offers-title">Liste des Annonces :</h1>
				<div className="offers">
					{data.offers.map((offer) => {
						return (
							<Link key={offer._id} to={`/offer/${offer._id}`}>
								<div className="card-container">
									<span className="offers-owner">
										{offer.owner.account.username}
									</span>

									<span className="offers-img-container">
										<img
											style={{ height: 400 }}
											src={offer.product_image.secure_url}
											alt=""
										/>
									</span>
									<div className="card">
										{/* <h2 style={{ marginBottom: 15 }}>{offer.product_name}</h2> */}
										<h2 className="offers-price">{offer.product_price} € </h2>

										{offer.product_details.map((item, index) => {
											const keys = Object.keys(item) // ["MARQUE"]
											return (
												<div key={index}>
													<span className="offers-marque">{item.MARQUE}</span>
													<span className="offers-taille">{item.TAILLE}</span>
												</div>
											)
										})}

										<span>{offer.product_details.MARQUE}</span>
									</div>
								</div>
							</Link>
						)
					})}
				</div>
				<div className="navPage">
					{/* {console.log(data.offers.length * page)} */}

					{data.offers.length === 0 ||
					data.offers.length * page === data.count ? (
						<div></div>
					) : page >= 2 && data.offers.length === limit ? (
						<div>
							<button onClick={() => setPage(page - 1)}>Page précédente</button>
							<button onClick={() => setPage(page + 1)}>Page suivante</button>
						</div>
					) : page === 1 ? (
						<div>
							<button onClick={() => setPage(page + 1)}>Page suivante</button>
						</div>
					) : (
						<div>
							<button onClick={() => setPage(page - 1)}>Page précédente</button>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Home
