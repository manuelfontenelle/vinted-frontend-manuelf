import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

// on peut aussi ici récupérer le token dans les Cookies
const Publish = ({ token }) => {
	const [picture, setPicture] = useState()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [brand, setBrand] = useState("")
	const [size, setSize] = useState("")
	const [color, setColor] = useState("")
	const [condition, setCondition] = useState("")
	const [city, setCity] = useState("")
	const [price, setPrice] = useState("")

	const [preview, setPreview] = useState("")

	const [errorMessage, setErrorMessage] = useState("")

	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()

			if (title && price && picture) {
				const formData = new FormData()
				formData.append("picture", picture)
				formData.append("title", title)
				formData.append("description", description)
				formData.append("brand", brand)
				formData.append("size", size)
				formData.append("color", color)
				formData.append("condition", condition)
				formData.append("city", city)
				formData.append("price", price)

				const response = await axios.post(
					// "https://vinted-backend-manuelf.herokuapp.com/offer/publish",
					"http://localhost:3001/offer/publish",
					formData,
					{
						headers: {
							// authorization: "Bearer " + token
							authorization: `Bearer ${token}`,
							// l'espace est indispensable car côté back on récupère ça:
							// req.headers.authorization.replace("Bearer ", "")
						},
					}
				)
				//   console.log(response.data);
				if (response.data._id) {
					// naviguer vers la page de l'annonce qui vient d'être créée
					navigate(`/offer/${response.data._id}`)
				}
			} else {
				setErrorMessage(
					"Les champs Title, Price et Picture sont obligatoires !"
				)
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	return token ? (
		<form
			style={{ padding: 30 }}
			onSubmit={handleSubmit}
			class="signup-form publish-form"
		>
			<div>
				<div style={{ height: 45, width: 180, border: "1px solid blue" }}>
					<label htmlFor="file">
						<span>+</span> <span>Ajouter une photo</span>
					</label>
				</div>
				<input
					style={{ display: "none" }}
					id="file"
					type="file"
					onChange={(event) => {
						setPicture(event.target.files[0])
						setPreview(URL.createObjectURL(event.target.files[0]))
					}}
				/>
			</div>
			{preview && <img src={preview} alt="" />}

			<br />
			<input
				type="text"
				placeholder="title"
				onChange={(event) => setTitle(event.target.value)}
			/>
			<br />
			<textarea
				name=""
				id=""
				cols="30"
				rows="10"
				placeholder="description"
				onChange={(event) => setDescription(event.target.value)}
			/>
			<br />
			<div className="text-input-section">
				<div className="text-input">
					<h4>Marque</h4>
					<input
						type="text"
						placeholder="ex : Nike"
						onChange={(event) => setBrand(event.target.value)}
					/>
				</div>

				<br />
				<div className="text-input">
					<h4>Taille</h4>
					<input
						type="text"
						placeholder="size"
						onChange={(event) => setSize(event.target.value)}
					/>
				</div>
				<br />
				<div className="text-input">
					<h4>Couleur</h4>
					<input
						type="text"
						placeholder="color"
						onChange={(event) => setColor(event.target.value)}
					/>
				</div>
				<br />
				<div className="text-input">
					<h4>Etat</h4>
					<input
						type="text"
						placeholder="condition"
						onChange={(event) => setCondition(event.target.value)}
					/>
				</div>
				<br />
				<div className="text-input">
					<h4>Lieu</h4>
					<input
						type="text"
						placeholder="city"
						onChange={(event) => setCity(event.target.value)}
					/>
				</div>
			</div>
			<br />
			<input
				type="number"
				placeholder="price"
				onChange={(event) => setPrice(event.target.value)}
			/>
			<br />
			<input type="submit" />
			{errorMessage}
		</form>
	) : (
		<Navigate to="/login" />
	)
}

export default Publish
