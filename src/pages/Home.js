import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				// "https://vinted-api-2022.herokuapp.com/offers"
				"https://lereacteur-vinted-api.herokuapp.com/offers?sort=price-desc"
			)
			// console.log(response.data)
			setData(response.data)
			setIsLoading(false)
		}
		fetchData()
	}, [])

	return isLoading ? (
		<div>En cours de chargement...</div>
	) : (
		<div className="offers container">
			{data.offers.map((offer) => {
				return (
					<Link key={offer._id} to={`/offer/${offer._id}`}>
						<div className="card">
							<h2 style={{ marginBottom: 15 }}>{offer.product_name}</h2>
							{/* <h2>{offer.product_price}</h2> */}
							<img
								style={{ height: 150 }}
								src={offer.product_image.secure_url}
								alt=""
							/>
						</div>
					</Link>
				)
			})}
		</div>
	)
}

export default Home
