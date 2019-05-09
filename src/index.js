import Data from './data.js'
import * as R from 'ramda'
import L from 'leaflet'

const map = L.map('map').setView([46.5817, 6.7369], 10)



const osmCH = L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  bounds: [[45, 5], [48, 11]]
})

const soccer = L.geoJson(Data)


const iconSoccer = L.icon({
    iconUrl: 'https://www.freeiconspng.com/uploads/soccer-ball-png-33.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
});

Data.features
		.filter(feature => R.pathEq(['geometry', 'type'], 'Point', feature))
		.map(feature => {
			const [lon, lat] = R.path(['geometry', 'coordinates'], feature)
			L.marker([lat, lon], {icon: iconSoccer}).addTo(map)

		})

osmCH.addTo(map)
//soccer.addTo(map)



