import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapZones from '../components/MapZones';
import isAuthenticated from '../utils/isAuthenticated';


const ALLZONES = gql`

query GETZONES {
	getAllZones{
		zone,
		location{
		  type,
		  coordinates
		}
	  }
}
`

function Home() {

	 const { data, error, loading } = useQuery(ALLZONES)
	
		return (
			<>
				<Navbar /> 
				<main className="container my-5 py-5">
					<section className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<h4>Mapa de zonas</h4>
						</div>
					</section>
					<section className="row">
						<div className="col-lg-8 col-md-10">
							{
								loading && <h4>Cargando ...</h4>
							}
							{
								!loading && <MapZones data={data.getAllZones} />
							}
						</div>
					</section>
				</main>
				<Footer />
			</>

		)
	
}

export default Home;