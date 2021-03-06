""" Face Color Machine Learning code """
from collections import Counter
import pprint
import base64
from io import BytesIO
from facenet_pytorch import MTCNN, InceptionResnetV1, extract_face
from PIL import Image, ImageDraw
import numpy as np
import cv2
from sklearn.cluster import KMeans
import imutils
from matplotlib import pyplot as plt
#from matplotlib.figure import Figure
#path = 'backend/ml/image/anne-marie'
plt.switch_backend('Agg')

resnet = InceptionResnetV1(pretrained='vggface2').eval()

def img_to_face(image_path):
    if not isinstance(image_path, str):
        final_path = image_path
    else:
        final_path = 'media/' + str(image_path)
    img = Image.open(final_path).convert('RGB')
    mtcnn = MTCNN(image_size=100)
    # Get cropped and prewhitened image tensor
    img_cropped = mtcnn(img, save_path='media/output/face.png')
    # Calculate embedding (unsqueeze to add batch dimension)
    img_embedding = resnet(img_cropped.unsqueeze(0))
    # Or, if using for VGGFace2 classification
    resnet.classify = True
    img_probs = resnet(img_cropped.unsqueeze(0))

#img_to_face(path)

def extractSkin(image):
    # Taking a copy of the image
    img = image.copy()
    # Converting from BGR Colours Space to HSV
    img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Defining HSV Threadholds
#     lower_threshold = np.array([0, 0, 0], dtype=np.uint8) # 0 48 80
#     upper_threshold = np.array([255, 255, 255], dtype=np.uint8) # 26 255 255

    lower_threshold = np.array([0, 48, 80], dtype=np.uint8) # 0 48 80 0 133 77
    upper_threshold = np.array([20, 255, 255], dtype=np.uint8) # 26 255 255 255 173 127

    # Single Channel mask,denoting presence of colours in the about threshold
    skinMask = cv2.inRange(img, lower_threshold, upper_threshold)

    # Cleaning up mask using Gaussian Filter
    skinMask = cv2.GaussianBlur(skinMask, (3, 3), 0)

    # Extracting skin from the threshold mask
    skin = cv2.bitwise_and(img, img, mask=skinMask)

    # Return the Skin image
    return cv2.cvtColor(skin, cv2.COLOR_HSV2BGR)


def removeBlack(estimator_labels, estimator_cluster):

    # Check for black
    hasBlack = False

    # Get the total number of occurance for each color
    occurance_counter = Counter(estimator_labels)

    # Quick lambda function to compare to lists
    def compare(x, y): return Counter(x) == Counter(y)

    # Loop through the most common occuring color
    for x in occurance_counter.most_common(len(estimator_cluster)):

        # Quick List comprehension to convert each of RBG Numbers to int
        color = [int(i) for i in estimator_cluster[x[0]].tolist()]

        # Check if the color is [0,0,0] that if it is black
        if compare(color, [0, 0, 0]) == True:
            # delete the occurance
            del occurance_counter[x[0]]
            # remove the cluster
            hasBlack = True
            estimator_cluster = np.delete(estimator_cluster, x[0], 0)
            break

    return (occurance_counter, estimator_cluster, hasBlack)


def getColorInformation(estimator_labels, estimator_cluster, hasThresholding=False):

    # Variable to keep count of the occurance of each color predicted
    occurance_counter = None

    # Output list variable to return
    colorInformation = []

    # Check for Black
    hasBlack = False

    # If a mask has be applied, remove th black
    if hasThresholding == True:

        (occurance, cluster, black) = removeBlack(
            estimator_labels, estimator_cluster)
        occurance_counter = occurance
        estimator_cluster = cluster
        hasBlack = black

    else:
        occurance_counter = Counter(estimator_labels)

    # Get the total sum of all the predicted occurances
    list_occurance_counter = list(occurance_counter.values())
    totalOccurance = int(sum(list_occurance_counter))

    # Loop through all the predicted colors
    for x in occurance_counter.most_common(len(estimator_cluster)):

        index = (int(x[0]))

        # Quick fix for index out of bound when there is no threshold
        index = (index-1) if ((hasThresholding & hasBlack)
                              & (int(index) != 0)) else index

        # Get the color number into a list
        color = estimator_cluster[index].tolist()

        # Get the percentage of each color
        color_percentage = (int(x[1])/totalOccurance)

        # make the dictionay of the information
        colorInfo = {"cluster_index": index, "color": color,
                     "color_percentage": color_percentage}

        # Add the dictionary to the list
        colorInformation.append(colorInfo)

    return colorInformation


def extractDominantColor(image, number_of_colors= 20, hasThresholding=False):

    # Quick Fix Increase cluster counter to neglect the black(Read Article)
    if hasThresholding == True:
        number_of_colors += 1

    # Taking Copy of the image
    img = image.copy()

    # Convert Image into RGB Colours Space
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Reshape Image
    img = img.reshape((img.shape[0]*img.shape[1]), 3)

    # Initiate KMeans Object
    estimator = KMeans(n_clusters=number_of_colors, random_state=0)

    # Fit the image
    estimator.fit(img)

    # Get Colour Information
    colorInformation = getColorInformation(
        estimator.labels_, estimator.cluster_centers_, hasThresholding)
    return colorInformation

def savepic(user_id):
    """save pictures """
    image = cv2.imread("media/output/face.png")
    plt.subplot(3, 1, 1)
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    skin = extractSkin(image)
    plt.subplot(3, 1, 2)
    plt.imshow(cv2.cvtColor(skin, cv2.COLOR_BGR2RGB))
    dominantcolors = extractDominantColor(skin, hasThresholding=True)
    colour_bar = plotColorBar(dominantcolors)
    plt.subplot(3, 1, 3)
    plt.axis("off")
    plt.imshow(colour_bar)
    plt.savefig('media/output/colorbar' + user_id + '.png')
    plt.close()
    #fig = Figure()
    #ax = fig.subplots()
    #ax.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB), cv2.cvtColor(skin, cv2.COLOR_BGR2RGB), 
    # colour_bar)
    #buf = BytesIO()
    #fig.savefig('color_bar', format="png")
    return

def plotColorBar(colorInformation):
    """ create a 500*100 color bar """
    color_bar = np.zeros((100, 500, 3), dtype="uint8")

    top_x = 0
    for x in colorInformation:
        bottom_x = top_x + (x["color_percentage"] * color_bar.shape[1])

        color = tuple(map(int, (x['color'])))

        cv2.rectangle(color_bar, (int(top_x), 0),
                      (int(bottom_x), color_bar.shape[0]), color, -1)
        top_x = bottom_x
    return color_bar

def tone_analysis(img_path, user_id):
    """ tone_analysis method """
    # pylint: disable=line-too-long,no-member,too-many-locals,no-self-use
    img_to_face(img_path)
    image = cv2.imread("media/output/face.png")
    savepic(user_id)
    image = imutils.resize(image, width=250)
    skin = extractSkin(image)
    dominantColors = extractDominantColor(skin, hasThresholding=True)
    max_color = [0,0,0]
    sel_color = [0,0,0]
    site1 = 0
    site2 = 1
    for i in range(20):
        lum = dominantColors[i].get('color')[0]*0.2126 + dominantColors[i].get('color')[1]*0.7152 + dominantColors[i].get('color')[2]*0.0722
        max_lum = max_color[0]*0.2126 + max_color[1]*0.7152 + max_color[2]*0.0722
        sel_lum = sel_color[0]*0.2126 + sel_color[1]*0.7152 + sel_color[2]*0.0722
        if max_lum < lum:
            sel_color[0] = max_color[0]
            sel_color[1] = max_color[1]
            sel_color[2] = max_color[2]
            max_color[0] = dominantColors[i].get('color')[0]
            max_color[1] = dominantColors[i].get('color')[1]
            max_color[2] = dominantColors[i].get('color')[2]
            site2 = site1
            site1 = i
        elif sel_lum < lum:
            sel_color[0] = dominantColors[i].get('color')[0]
            sel_color[1] = dominantColors[i].get('color')[1]
            sel_color[2] = dominantColors[i].get('color')[2]
            site2 = i
    return sel_color

