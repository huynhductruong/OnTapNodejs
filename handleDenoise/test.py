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

def unsharp_mask(image, sigma=1.0, strength=1.5):
    blurred = cv2.GaussianBlur(image, (0, 0), sigma)
    sharpened = float(strength + 1) * image - float(strength) * blurred
    sharpened = np.maximum(sharpened, 0)
    sharpened = np.minimum(sharpened, 255)
    sharpened = sharpened.astype(np.uint8)
    return sharpened

def process_image(image_path):

    # Dinh nghia bien

    # Load model
    model = load_model("E:/Web/OnTapNodejs/handleDenoise/denoise_model.h5",compile=False)

    # Đọc ảnh từ đường dẫn
    image = cv2.imread(image_path)

    processed_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    processed_image = cv2.resize(processed_image, (image_size, image_size))
    processed_image = processed_image / 255.0

    # Dùng mô hình học máy để dự đoán
    print('OK')
    predictions = model.predict(np.expand_dims(processed_image, axis=0))

    predictions=predictions.reshape(image_size, image_size,1) * 255
    blurred = cv2.GaussianBlur(predictions, (0, 0), 3)

    # Tính toán ảnh sharpened bằng cách lấy ảnh gốc trừ đi ảnh làm mịn
    sharpened = cv2.addWeighted(predictions, 1.45, blurred, -0.45, 0)
  
    sharpened_image = unsharp_mask(sharpened)


    parts  = image_path.split('/')
    imgname= parts[-1]
    
    cv2.imwrite('E:/Web/OnTapNodejs/public/' + imgname,sharpened_image.reshape(image_size,
               image_size, 1)) 
    
   

# Main program
processed_image_path = process_image(image_path)
