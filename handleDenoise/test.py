import cv2
import tensorflow as tf
import numpy as np
from tkinter import filedialog
from tkinter import Tk
from tensorflow.keras.models import load_model

# Hàm để mở hộp thoại chọn tệp ảnh từ máy tính


import pickle
from tensorflow.keras.models import load_model
import matplotlib.pyplot as plt
import cv2
import argparse

# # Ve len man hinh de kiem tra
# for i in range(s_id, e_id):
#     new_image = cv2.blur(noise_test[i], (3, 3))
#     new_image_1 = cv2.blur(noise_test[i], (5, 5))
#     plt.figure(figsize=(8, 3))
#     plt.subplot(141)
#     plt.imshow(pred_images[i-s_id].reshape(image_size,
#                image_size, 1), cmap='gray')
#     plt.title(i-s_id)
#     plt.xticks([])
#     plt.yticks([])
#     plt.subplot(142)
#     plt.imshow(new_image, cmap='gray')
#     plt.title('Blur OpenCV (K3)')
#     plt.xticks([])
#     plt.yticks([])
#     plt.subplot(143)
#     plt.imshow(new_image_1, cmap='gray')
#     plt.title('Blur OpenCV (K5)')
#     plt.xticks([])
#     plt.yticks([])
#     plt.subplot(144)
#     plt.imshow(noise_test[i], cmap='gray')
#     plt.title('Noise image')
#     plt.xticks([])
#     plt.yticks([])

#     plt.show()

parser = argparse.ArgumentParser()
import argparse


parser = argparse.ArgumentParser()


parser.add_argument('--image', type=str)


args = parser.parse_args()

image_path = args.image

image_size = 500


def process_image(image_path):

    # Dinh nghia bien

    # Load model
    model = load_model("E:/Web/OnTapNodejs/handleDenoise/denoise_model.h5")

    # Đọc ảnh từ đường dẫn
    image = cv2.imread(image_path)

    processed_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    processed_image = cv2.resize(processed_image, (image_size, image_size))

    # Thực hiện xử lý ảnh, ví dụ: chuẩn hóa và điều chỉnh kích thước
    # processed_image = cv2.resize(image, (600, 600))
    # Chuẩn hóa pixel về khoảng [0, 1]
    processed_image = processed_image / 255.0

    # Dùng mô hình học máy để dự đoán
    print('OK')
    predictions = model.predict(np.expand_dims(processed_image, axis=0))
    # predictions = np.uint8(np.clip(predictions, 0, 255))
    # predictions = np.uint8(np.clip(predictions, 0, 255))
    parts  = image_path.split('/')
    imgname= parts[-1]
    predictions = predictions.reshape(image_size,image_size, 1)
    cv2.imwrite('E:/Web/OnTapNodejs/public/' + imgname,predictions*255 ) 
    
   

# Main program
processed_image_path = process_image(image_path)
