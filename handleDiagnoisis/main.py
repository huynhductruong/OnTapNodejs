from ultralytics import YOLO
from PIL import Image
import argparse
# Load a pretrained YOLOv8n model
model = YOLO('E:/Web/OnTapNodejs/handleDiagnoisis/best.pt')
parser = argparse.ArgumentParser()
parser.add_argument('--image', type=str)
args = parser.parse_args()
image_path = args.image

# Define path to the image file


# Run inference on the source
results = model.predict(image_path, conf=0.5)  # list of Results objects

# Show the results
for r in results:
    im_array = r.plot()  # plot a BGR numpy array of predictions
    im = Image.fromarray(im_array[..., ::-1])  # RGB PIL image
    # im.show()  # show image
    parts  = image_path.split('/')
    imgname= parts[-1]
    im.save('E:/Web/OnTapNodejs/public/' +imgname)  # save image

for result in results:

    boxes = result.boxes.cpu().numpy()

    # print(boxes.cls) # id_class
     # acc

    # lap qua cac bouding box
    for box in boxes:
        # kết quả chuẩn đoán bệnh
        confidence = str(box.conf[0]) if len(box.conf) > 0 else "N/A"
        print("Result : ",result.names[int(box.cls[0])])
        # phần trăm chuẩn đoán
        print("Accuracy : ",round(float(confidence), 2)*100,"%")
            # name class
        # r = box.xyxy[0].astype(int)     # xyxy bbox
        # print(r)