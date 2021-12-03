import React, { useEffect, useState } from 'react'
import ecoImg from './eco.png'
import fireImg from './fire.png'
import trashImg from './trash.png'
import {io} from 'socket.io-client'

const cams = {
	0: [55.863581, 49.083282],
	1: [55.860292, 49.082115],
	2: 'Татарстан, Лечебная улица, 7',
	3: [55.868811, 49.064165]
}

const fireCam = [55.862292, 49.082715]

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

	useEffect(() => {
		function init() {
			if (myMap) return
			const map = new ymaps.Map('map', {
				center: fireCam,
				zoom: 14,
			})

			setMyMap(map)

			const multiRoute = new ymaps.multiRouter.MultiRoute({
				referencePoints: Object.values(cams),
			}, {
				boundsAutoApply: true,
				wayPointStartIconLayout: "default#image",
				wayPointStartIconImageHref: trashImg,
				wayPointStartIconImageSize: [30, 30],
				wayPointStartIconImageOffset: [-15, -15],
				wayPointFinishIconLayout: "default#image",
				wayPointFinishIconImageHref: trashImg,
				wayPointFinishIconImageSize: [30, 30],
				wayPointFinishIconImageOffset: [-15, -15],
				viaPointIconLayout: "default#image",
				viaPointIconImageHref: trashImg,
				viaPointIconImageSize: [30, 30],
				viaPointIconImageOffset: [-15, -15],
			})

			map.geoObjects.add(multiRoute)
		}

		const socket = io('http://172.20.10.12:5005')

		socket.on('connect', () => {
			console.log('socket io connected!')
			socket.emit('message', 'message')

			socket.on('message', message => {
				console.log('message: ', message)
				setImage(message)
			})
		})

		loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=fa8b869d-ab3e-46f5-a2d5-1b7f56fd63f7', () => {
			ymaps.ready(init)
		})
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setFire(!fire)
		}, 5000)
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
			myMap.geoObjects.add(myPlacemark)
			setFireMark(myPlacemark)
		} else {
			myMap.geoObjects.remove(fireMark)
		}
	}, [myMap, fire])

	return (
		<div className='App' style={{ border: `7px solid transparent`, background: `${fire ? 'red' : '#2E4053'}` }}>
			<div style={{ width: '100%', height: 70, display: 'flex' }}>
				<img src={fire ? fireImg : ecoImg} style={{ height: 35, margin: 15, marginRight: 20 }}/>
				{fire ? (
					<h2 style={{ color: 'white' }}>Пожар!!!</h2>
				) : (
					<h2 style={{ color: '#FFC65C' }}>Чистый Татарстан</h2>
				)}
			</div>
			<div id='map' style={{ width: '100%', height: 'calc(100vh - 84px)' }}/>
			{/*<img id="ItemPreview" src={`data:image/jpg;base64,${encode(new Uint8Array(image))}`}/>*/}
		</div>
	)
}

export default App
