import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react"

const Header = ({
	logo,
	token,
	setUser,
	title,
	setSearch,
	setPage,
	handleChangeSortPrice,
}) => {
	const navigate = useNavigate()
	return (
		<div className="header-container">
			<div className="header container">
				<Link to={`/`}>
					<img className="logo" src={logo} alt="" />
				</Link>
				<div className="panel-edit-search">
					<div className="panel-edit-search-top">
						<div className="search-container">
							<input
								placeholder="Recherche des articles"
								className="searchInput"
								type="text"
								value={title}
								onChange={(event) => {
									setSearch(event.target.value)
									setPage(1)
								}}
							/>
						</div>
					</div>
					<div className="panel-edit-search-bottom">
						<div className="checkbox-container-sort">
							<label htmlFor="checkbox">Trier par prix</label>
							<div className="check">
								<input
									onChange={(event) =>
										handleChangeSortPrice(event.target.checked)
									}
									type="checkbox"
									className="check__check"
									// checked={sortedPrice}
									// value=""
									id="checkbox"
								/>
								<div className="check__indicator" />
							</div>
						</div>
					</div>
				</div>
				{token ? (
					<>
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
