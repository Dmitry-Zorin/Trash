import React from 'react'

const cams = {
	26: [55.863581, 49.083282],
	27: [55.860292, 49.082115],
}

const loadScript = (src, onLoad) => {
	const script = document.createElement('script')

	script.src = src
	script.async = true
	document.body.appendChild(script)
	script.onload = onLoad
}

const init = () => {
	const myMap = new ymaps.Map('map', {
		center: [55.863581, 49.083282],
		zoom: 14,
	})

	// const myPlacemark = new ymaps.Placemark(cams[26])
	// myMap.geoObjects.add(myPlacemark)
	//
	// const myPlacemark2 = new ymaps.Placemark(cams[27])
	// myMap.geoObjects.add(myPlacemark2)

	const multiRoute = new ymaps.multiRouter.MultiRoute({
		referencePoints: [cams[26], cams[27]],
	}, {
		boundsAutoApply: true,
	})
	myMap.geoObjects.add(multiRoute)
}

const App = () => {
	React.useEffect(() => {
		loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=fa8b869d-ab3e-46f5-a2d5-1b7f56fd63f7', () => {
			ymaps.ready(init)
		})
	}, [])

	return (
		<div className='App'>
			<div id='map' style={{ width: '100%', height: '100vh' }}/>
		</div>
	)
}

export default App
