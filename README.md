<h4>Реализованная функциональность</h4>
<ul>
    <li>Обнаружение пожаров</li>
    <li>Обнаружение мусора в мусорных баках</li>
    <li>Веб-интерфейс</li>
</ul> 
<h4>Особенность проекта в следующем:</h4>
<ul>
<li>Улучшенная разметка данных</li>
 <li>Передача изображений с помощью Вебсокетов</li>
 </ul>
<h4>Основной стек технологий:</h4>
<ul>
	<li>Python</li>
	<li>OPENCV, ImageAI</li>
	<li>Keras, TensorFlow</li>
	<li>NumPy</li>
	<li>HTML, CSS, JavaScript</li>
	<li>React</li>
	<li>Git</li>
	<li>Socket IO</li>
 </ul>
<h4>Демо</h4>
<p>Демо веб-интерфейса доступно по адресу: https://trash-eight.vercel.app</p>


УСТАНОВКА
------------

### Установка и запуск пакета fire

Выполните

~~~
cd fire
pip install tensorflow opencv-python keras imageai
python fire.py 
~~~

### Установка и запуск пакета yolo

Выполните

~~~
cd yolo
pip install -qr requirements.txt
python detect.py --source 0 # webcam
                          img.jpg # image 
                          vid.mp4 # video
                          path/ # directory
                          path/*.jpg # glob
                          'https://youtu.be/Zgi9g1ksQHc' # YouTube
                          'rtsp://example.com/media.mp4' # RTSP, RTMP, HTTP stream
python detect.py --weights yolov5s.pt --img 640 --conf 0.25 --source data/images
display.Image(filename='runs/detect/exp/23-11-2021_02-36-38_PM.png', width=600) 
~~~

### Установка и запуск веб-интерфейса

Выполните

~~~
npm install
npm run dev
~~~

РАЗРАБОТЧИКИ

<h4>Чапоргин Андрей 3D-дизайнер</h4>
<h4>Соколов Вадим аналитик</h4>
<h4>Титов Владислав backend</h4>
<h4>Зорин Дмитрий fullstack</h4>
