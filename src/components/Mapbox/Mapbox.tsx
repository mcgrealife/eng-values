import './Mapbox.module.css'
import mapboxgl, { Map, MapboxOptions, MarkerOptions, Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { assertValue } from '@/lib/handleEnv'
import { baseUrl } from '../../../sitemap'

mapboxgl.accessToken = assertValue(
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  'Missing env var: NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN'
)

const myCoords: mapboxgl.LngLatLike = [-82.4009837, 34.8448609]

export const Mapbox = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<Map | null>(null)
  const [center, setCenter] = useState<MapboxOptions['center'] | null>(null)
  const [zoom] = useState<MapboxOptions['zoom']>(0)

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/getUserCoords`)
      .then((res) => res.json())
      .then((coords) => setCenter([coords.lng, coords.lat]))
  }, [])

  useEffect(() => {
    // initMap
    if (map.current !== null) return // initialize map only once
    if (!center) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center,
      zoom,
      cooperativeGestures: true,
    })
  }, [center, zoom, map])

  useEffect(() => {
    // update zoom/center after user coords fetch
    if (!map.current || !center) return
    const popupData = [
      {
        html: `<div>Me (Greenville, SC)</div>`,
        coords: myCoords,
      },
      {
        html: `<div>You! (via IP)</div>`,
        coords: center,
      },
    ]
    popupData.forEach((p) => {
      // add popups to map
      map.current &&
        new mapboxgl.Popup({
          closeButton: false,
        })
          .setLngLat(p.coords)
          .setHTML(p.html)
          .addTo(map.current)
    })
    map.current.fitBounds([myCoords, center])
  }, [map, center])

  useEffect(() => {
    return () => map.current?.remove()
  }, [])

  return (
    <>
      <div
        ref={mapContainer}
        style={{ width: '100%', height: 500 }}
        className='map-container'></div>
    </>
  )
}

export default Mapbox
