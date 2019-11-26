""" finds closest sub_color tag """
import webcolors
from colormath.color_objects import sRGBColor, LabColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000

# PINK COLOR
PINK_LIST = [(255, 202, 226), (236, 199, 205), (252, 174, 187), (255, 141, 161), (251, 132, 186),
             (241, 106, 183), (224, 98, 135), (247, 74, 131), (225, 0, 152), (236, 0, 95)]

# RED COLOR
RED_LIST = [(255, 120, 117), (255, 99, 113), (255, 88, 93), (224, 62, 82), (239, 51, 64),
            (184, 58, 75), (172, 20, 90), (153, 0, 0), (138, 21, 56), (111, 38, 61)]

# ORANGE COLOR
ORANGE_LIST = [(255, 189, 167), (255, 186, 179), (255, 141, 109), (255, 126, 113), (255, 139, 83),
               (255, 153, 85), (255, 135, 15), (248, 102, 39), (254, 80, 0), (225, 71, 26)]

# PURPLE COLOR
PURPLE_LIST = [(218, 207, 221), (197, 180, 227), (139, 132, 215), (215, 159, 191), (185, 87, 143),
               (187, 41, 187), (100, 48, 122), (129, 54, 97), (101, 49, 101), (63, 42, 86)]


# LIGHT_WARM_SKIN
LW_LIST = [(252, 237, 218), (252, 233, 200), (243, 212, 185), (233, 192, 155)]

# LIGHT_COOL_SKIN
LC_LIST = [(251, 214, 184), (251, 210, 192), (251, 189, 168), (239, 161, 149)]

# MEDIUM_SKIN
M_LIST = [(231, 208, 145), (215, 179, 125), (201, 149, 99), (179, 120, 85)]

# DARK_SKIN
D_LIST = [(150, 103, 61), (135, 74, 35), (74, 37, 11), (55, 29, 9)]


def two_point_length_by_cie(tuple1, tuple2):
    """ find color diff using CIELAB"""
    color1_rgb = sRGBColor(tuple1[0], tuple1[1], tuple1[1])
    color2_rgb = sRGBColor(tuple2[0], tuple2[1], tuple2[1])
    color1_lab = convert_color(color1_rgb, LabColor)
    color2_lab = convert_color(color2_rgb, LabColor)
    delta_e = delta_e_cie2000(color1_lab, color2_lab)
    return delta_e


def two_point_length_by_euc(tuple1, tuple2):
    """ find color diff using euclidean"""
    tot_sum = pow(tuple1[0] - tuple2[0], 2)
    tot_sum += pow(tuple1[1] - tuple2[1], 2)
    tot_sum += pow(tuple1[2] - tuple2[2], 2)
    final_len = pow(tot_sum, 1 / 2)
    return final_len


def min_lip_len(hexa):
    """ find sub_color with minimum length """
    # pylint: disable=too-many-locals,too-many-return-statements,too-many-branches
    # 색조 sub-color
    color_total_list = PINK_LIST + RED_LIST + ORANGE_LIST + PURPLE_LIST
    len_cie = []
    len_euc = []
    tar_color = -1
    for idx, color in enumerate(color_total_list):
        len_cie.append((idx, two_point_length_by_cie(hexa, color)))
        len_euc.append((idx, two_point_length_by_euc(hexa, color)))
    len_cie.sort(key=lambda x: x[1])
    len_euc.sort(key=lambda x: x[1])
    len_euc = [x[0] for x in len_euc]
    rank = [0] * 40
    for idx, result in enumerate(len_cie):
        rank[result[0]] = idx
        rank[result[0]] += len_euc.index(result[0])
    if rank.count(min(rank)) == 1:
        tar_color = rank.index(min(rank))
    else:
        mins = [i for i, x in enumerate(rank) if x == min(rank)]
        mins_len = [two_point_length_by_cie(hexa, color_total_list[i]) for i in mins]
        tar_color = mins[mins_len.index(min(mins_len))]
    if int(tar_color / 10) == 0:
        return ('PK', webcolors.rgb_to_hex(color_total_list[tar_color]))
    if int(tar_color / 10) == 1:
        return ('RD', webcolors.rgb_to_hex(color_total_list[tar_color]))
    if int(tar_color / 10) == 2:
        return ('OR', webcolors.rgb_to_hex(color_total_list[tar_color]))
    if int(tar_color / 10) == 3:
        return ('PU', webcolors.rgb_to_hex(color_total_list[tar_color]))
    return (None, None)


''' # TODO : FIX
def min_base_len(tuple1):
    min_face = -1
    tar_face = -1
    face_total_list = LW_LIST + LC_LIST + M_LIST + D_LIST
    i = -1
    for val in face_total_list:
        i += 1
        if min_face == -1:
            min_face = two_point_length(tuple1, val)
            tar_face = 0
            continue
        temp = two_point_length(tuple1, val)
        if temp < min_face:
            min_face = temp
            tar_face = i
    if min_face != -1:
        if (tar_face / 4) == 0:
            return ('LW', webcolors.rgb_to_hex(face_total_list[tar_face]))
        if (tar_face / 4) == 1:
            return ('LC', webcolors.rgb_to_hex(face_total_list[tar_face]))
        if (tar_face / 4) == 2:
            return ('ME', webcolors.rgb_to_hex(face_total_list[tar_face]))
        if (tar_face / 4) == 3:
            return ('DA', webcolors.rgb_to_hex(face_total_list[tar_face]))
    return (None, None) '''


def cal_color_tag(title, hexa):
    """ return closest sub_color with given input """
    item_rgb = webcolors.hex_to_rgb(hexa)
    if title == 'lip':
        return min_lip_len(item_rgb)
    return -1
