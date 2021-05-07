import json
import cv2
from socketIO_client_nexus import SocketIO, LoggingNamespace

# Connect to raspberry pi server
def on_connect(socket):
    socket.emit('CV-connect', {})


# Initialize Globals
frameWidth = 640
frameHeight = 480
cam = cv2.VideoCapture(0)
cam.set(3, frameWidth)
cam.set(4, frameHeight)
cam.set(10, 150)

# Cascades
faceCascade = cv2.CascadeClassifier('/home/edubu/Projects/Resources/haarcascades/haarcascade_frontalface_default.xml')

# Camera Vision modules
def detect_faces(img):
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(imgGray, 1.1, 4)
    imgFaces = draw_faces(faces, img)
    return faces, imgFaces

def draw_faces(faces, img):
    for (face_x, face_y, face_w, face_h) in faces:
        cv2.rectangle(img, (face_x, face_y), (face_x + face_w, face_y + face_h), (255, 0, 0), 2)
    return img


with SocketIO('192.168.0.21', 3000, LoggingNamespace) as socket:
    socket.on('connect', on_connect(socket))

    while True:
        success, img = cam.read()
        faces, imgFaces = detect_faces(img)
        cv2.imshow("Face detection", imgFaces)

        if len(faces) > 0:
            state = 1
        else:
            state = 0

        data = {
            "pin": 13,
            "id": 'led1',
            "state": state
        }
        dataJSON = json.dumps(data)

        socket.emit('CV-setled', dataJSON)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

