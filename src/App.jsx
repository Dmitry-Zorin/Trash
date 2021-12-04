import React, { useEffect, useState } from 'react'
import { CenterModal, ModalCloseTarget, ModalTitle } from 'react-spring-modal'
import 'react-spring-modal/styles.css'
import { io } from 'socket.io-client'
import camImg from './images/cam.jpg'
import ecoImg from './images/eco.png'
import fireDetectedImg from './images/fire-detected.jpg'
import fireImg from './images/fire.png'
import landfillImg from './images/landfill.png'
import trashImg from './images/trash.png'
import truckImg from './images/truck.png'

const cameras = [
	[55.860292, 49.082115],
	'Татарстан, Лечебная улица, 7',
	[55.868736, 49.084330],
]

const startPoint = [55.863581, 49.083282]
const endPoint = [55.868811, 49.064165]

const fireCam = [55.865249, 49.075854]

const loadScript = (src, onLoad) => {
	const script = document.createElement('script')

	script.src = src
	script.async = true
	document.body.appendChild(script)
	script.onload = onLoad
}

function encode(input) {
	var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	var output = ''
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4
	var i = 0

	while (i < input.length) {
		chr1 = input[i++]
		chr2 = i < input.length ? input[i++] : Number.NaN // Not sure if the index
		chr3 = i < input.length ? input[i++] : Number.NaN // checks are needed here

		enc1 = chr1 >> 2
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
		enc4 = chr3 & 63

		if (isNaN(chr2)) {
			enc3 = enc4 = 64
		}
		else if (isNaN(chr3)) {
			enc4 = 64
		}
		output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
			keyStr.charAt(enc3) + keyStr.charAt(enc4)
	}
	return output
}

const App = () => {
	const [image, setImage] = useState()
	const [fire, setFire] = useState(false)
	const [fireMark, setFireMark] = useState()
	const [myMap, setMyMap] = useState()
	const [isOpen, setOpen] = useState(false)
	const [isOpen2, setOpen2] = useState(false)
	const [cams, setCams] = useState([])
	const [route, setRoute] = useState()

	useEffect(() => {
		function init() {
			if (myMap) return
			const map = new ymaps.Map('map', {
				center: fireCam,
				zoom: 14,
			})

			setMyMap(map)

			const myCircle = new ymaps.Circle([
				[55.864517, 49.074494],
				1500,
			], {
				balloonContent: 'Радиус круга - 1,5 км',
			}, {
				fillColor: 'rgba(208,222,250,0.47)',
				strokeColor: '#2E4053',
				strokeOpacity: 0.5,
				strokeWidth: 5,
			})

			map.geoObjects.add(myCircle)
		}

		// const socket = io('http://192.168.1.183:5005')
		//
		// socket.on('connect', () => {
		// 	console.log('socket io connected!')
		//
		// 	const interval = setTimeout(() => {
		// 		socket.emit('message', 'message')
		// 	}, 10000)
		//
		// 	socket.on('message', message => {
		// 		console.log('message: ', message)
		// 		if (message) {
		// 			setImage(message)
		// 			setFire(true)
		// 		}
		// 	})
		//
		// 	return () => clearTimeout(interval)
		// })

		// Для Демо
		setTimeout(() => {
			setFire(true)
		}, 12000)

		setTimeout(() => {
			setCams(cams => [...cams, cameras[0]])
		}, 3000)

		setTimeout(() => {
			setCams(cams => [...cams, cameras[1]])
		}, 6000)

		setTimeout(() => {
			setCams(cams => [...cams, cameras[2]])
		}, 9000)

		loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=fa8b869d-ab3e-46f5-a2d5-1b7f56fd63f7', () => {
			ymaps.ready(init)
		})
	}, [])

	useEffect(() => {
		if (!myMap) return
		myMap.geoObjects.remove(route)
		const multiRoute = new ymaps.multiRouter.MultiRoute({
			referencePoints: [
				startPoint,
				...cams,
				endPoint,
			],
		}, {
			boundsAutoApply: true,
			wayPointStartIconLayout: 'default#image',
			wayPointStartIconImageHref: truckImg,
			wayPointStartIconImageSize: [40, 40],
			wayPointStartIconImageOffset: [-20, -20],
			wayPointFinishIconLayout: 'default#image',
			wayPointFinishIconImageHref: landfillImg,
			wayPointFinishIconImageSize: [40, 40],
			wayPointFinishIconImageOffset: [-20, -20],
			wayPointIconLayout: 'default#image',
			wayPointIconImageHref: trashImg,
			wayPointIconImageSize: [40, 40],
			wayPointIconImageOffset: [-20, -20],
			routeActiveStrokeWidth: 5,
			routeActiveStrokeColor: '#003DC0',
		})

		multiRoute.model.events.once('requestsuccess', function () {
			for (let i in Object.keys(cams)) {
				console.log(i)
				multiRoute.getWayPoints().get(+i + 1).events.add('click', () => {
					setOpen2(true)
				})
			}
		})

		myMap.geoObjects.add(multiRoute)
		setRoute(multiRoute)
	}, [myMap, cams.length])

	useEffect(() => {
		if (!myMap) return
		if (fire) {
			const myPlacemark = new ymaps.Placemark(fireCam, {
				hintContent: 'Пожар',
			}, {
				iconLayout: 'default#image',
				iconImageHref: fireImg,
				iconImageSize: [60, 60],
				iconImageOffset: [-30, -30],
			})
			myPlacemark.events.add('click', () => {
				setOpen(true)
			})
			myMap.geoObjects.add(myPlacemark)
			setFireMark(myPlacemark)
		}
		else {
			myMap.geoObjects.remove(fireMark)
		}
	}, [myMap, fire])

	return (
		<div className='App' style={{ border: `20px solid transparent`, borderTop: 0, background: `${fire ? '#EE324A' : '#2E4053'}` }}>
			<div style={{ width: '100%', height: 70, display: 'flex' }}>
				<img src={fire ? fireImg : ecoImg} style={{ height: 35, margin: 15, marginRight: 20 }}/>
				{fire ? (
					<h2 style={{ color: 'white' }}>Пожар!!!</h2>
				) : (
					<h2 style={{ color: '#FFC65C' }}>Чистый Татарстан</h2>
				)}
			</div>
			<div id='map' style={{ width: '100%', height: 'calc(100vh - 100px)', border: '5px solid #FFC65C', borderRadius: 5 }}/>
			<CenterModal isOpen={isOpen2} onDismiss={() => setOpen2(false)}>
				<ModalTitle style={{ textAlign: 'center', color: '#2E4053' }}>Камера</ModalTitle>
				<img
					id='ItemPreview2'
					// src={`data:image/jpg;base64,${encode(new Uint8Array(image))}`}
					src={camImg}
					style={{ width: '100%', height: 'auto', maxHeight: '45vh' }}
				/>
			</CenterModal>
			<CenterModal isOpen={isOpen} onDismiss={() => setOpen(false)}>
				<ModalTitle style={{ textAlign: 'center', color: 'red' }}>Обнаружен пожар</ModalTitle>
				<img
					id='ItemPreview'
					// src={`data:image/jpg;base64,${encode(new Uint8Array(image))}`}
					src={fireDetectedImg}
					style={{ width: '100%', height: 'auto', maxHeight: '45vh' }}
				/>
				<ModalCloseTarget style={{ display: 'flex' }}>
					<button
						className='button button1'
						onClick={() => setFire(false)}
					>
						Вызвать пожарную службу
					</button>
					<button
						className='button button1'
						onClick={() => setFire(false)}
					>
						Отменить тревогу
					</button>
				</ModalCloseTarget>
			</CenterModal>
		</div>
	)
}

export default App
