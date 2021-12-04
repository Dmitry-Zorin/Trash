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
	<li>Keras, TensorFlow, PyTorch</li>
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

Скачайте (Большие файлы не поместились на GitHub)

https://drive.google.com/drive/folders/1bxHBfdDjCgvjsg3PHj9smdmhkT7IWx0K?usp=sharing

Выполните

~~~
cd fire
pip install tensorflow opencv-python keras imageai
python fire.py
# Параллельно в другой вкладке
python server.py
~~~

### Установка и запуск пакета yolo

Выполните

~~~
git clone https://github.com/Dmitry-Zorin/Trash
cd Trash/yolo
pip install -qr requirements.txt
python detect.py --source 0 # webcam
                          img.jpg # image 
                          vid.mp4 # video
                          path/ # directory
                          path/*.jpg # glob
                          'https://youtu.be/Zgi9g1ksQHc' # YouTube
                          'rtsp://example.com/media.mp4' # RTSP, RTMP, HTTP stream
python detect.py --weights runs/train/exp/weights/yolov5.pt --img 416 --conf 0.25 --source data/images/23-11-2021_02-36-38_PM.png

# Тренировка, данные заливаются с Roboflow
python train.py --img 416 --batch 16 --epochs 30 --data tatarstan-1/data.yaml --weights yolov5s.pt --cache

# Валидация данных
python val.py --weights runs/train/exp/weights/yolov5.pt --data data.yaml --img 416 --iou 0.65 --half
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
