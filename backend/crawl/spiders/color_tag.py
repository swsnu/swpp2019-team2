""" finds closest sub_color tag """
import webcolors

# PINK COLOR
PINK_DICT = {'PINK_PINK': 'FC0FC0', 'PINK_RUBY': 'E0115F', 'PINK_ULTRA': 'FF6FFF', 'PINK_THULIAN': 'FDE6FA1',
             'PINK_MAGENTA': 'FF0090', 'PINK_ROSEPINK': 'FF66CC', 'PINK_LAVENDER': 'FBAED2', 'PINK_CREAMY': 'FF69B4',
             'PINK_FUCHSIA': 'FF00FF', 'PINK_FRENCHROSE': 'F64A8A', 'PINK_CERISE': 'DE3163', 'PINK_CARNATION': 'FFA6C9',
             'PINK_BRICK': 'FB607F', 'PINK_AMARANTH': 'F19CBB', 'PINK_TAFFY': 'F987C5', 'PINK_BUBBLEGUM': 'FE5BAC',
             'PINK_HOTPINK': 'F81894', 'PINK_PUNCH': 'EC5578', 'PINK_LEMONADE': 'FDB9C8', 'PINK_FLAMINGO': 'FCA3B7'}
PINK_LIST = [(255, 202, 226), (236, 199, 205), (252, 174, 187), (255, 141, 161), (251, 132, 186),
             (241, 106, 183), (224, 98, 135), (247, 74, 131), (225, 0, 152), (236, 0, 95)]



# RED COLOR
RED_DICT = {'RED_RED': 'D30000', 'RED_SALMON': 'FA8072', 'RED_SCARLET': 'FF2400', 'RED_BARNRED': '7C0A02',
            'RED_IMPERIAL': 'ED2939', 'RED_INDIANRED': 'CD5C5C', 'RED_CHILI': 'C21807', 'RED_FIREBRICK': 'B22222',
            'RED_MAROON': '800000', 'RED_REDWOOD': 'A45A52', 'RED_RASPBERRY': 'D21F3C', 'RED_CANDYAPPLE': 'FF0800',
            'RED_FERRARI': 'FF2800', 'RED_PERSIAN': 'CA3433', 'RED_USFLAG': 'BF0A30', 'RED_CARMINE': '960019',
            'RED_BURGANDY': '8D021F', 'RED_CRIMSON': 'B80F0A', 'RED_SANGRIA': '5E1914', 'RED_MAHOGANY': '420D09'}
RED_LIST = [(255, 120, 117), (255, 99, 113), (255, 88, 93), (224, 62, 82), (239, 51, 64),
            (184, 58, 75), (172, 20, 90), (153, 0, 0), (138, 21, 56), (111, 38, 61)]



# ORANGE COLOR
ORANGE_DICT = {'ORANGE_ORANGE': 'FC6600', 'ORANGE_GOLD': 'F9A602', 'ORANGE_GOLDENROD': 'DBA520', 'ORANGE_PUMPKIN': 'FF7417',
               'ORANGE_FIRE': 'FDA50F', 'ORANGE_OCHRE': 'CC7722', 'ORANGE_BURNTORANGE': '964000', 'ORANGE_DIJON': 'C49102',
               'ORANGE_TANGERINE': 'F9812A', 'ORANGE_TIGER': 'FD6A02', 'ORANGE_HONEY': 'EB9605', 'ORANGE_CARROT': 'EF7215',
               'ORANGE_AMBER': 'FFBF00', 'ORANGE_APRICOT': 'EF820D', 'ORANGE_BRONZE': 'B1560F', 'ORANGE_CIDER': 'B3672B',
               'ORANGE_CLAY': '813F0B', 'ORANGE_RUST': '8B4000', 'ORANGE_AMBER2': '883000', 'ORANGE_SPICE': '793802'}
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


def hex_into_rgb(hexa):
    """ change hex value into rgb value """
    str_r = hexa[0:2]
    str_g = hexa[2:4]
    str_b = hexa[4:]
    hex_r = '0x' + str_r
    hex_g = '0x' + str_g
    hex_b = '0x' + str_b
    rgb_r = int(hex_r, 16)
    rgb_g = int(hex_g, 16)
    rgb_b = int(hex_b, 16)
    rgb = (rgb_r, rgb_g, rgb_b)
    return rgb


def two_point_length(tuple1, tuple2):
    """ find distance between two rgb values """
    tot_sum = 0
    tot_sum += pow(tuple1[0]-tuple2[0], 2)
    tot_sum += pow(tuple1[1]-tuple2[1], 2)
    tot_sum += pow(tuple1[2]-tuple2[2], 2)
    final_len = pow(tot_sum, 1/2)
    return final_len


def min_len(tuple1):
    """ find sub_color with minimum length """
    # pylint: disable=too-many-locals,too-many-return-statements,too-many-branches
    # 색조 sub-color
    min_color = -1
    tar_color = -1
    color_total_list = PINK_LIST + RED_LIST + ORANGE_LIST + PURPLE_LIST
    i = -1
    for val in color_total_list:
        i += 1
        if min_color == -1:
            min_color = two_point_length(tuple1, val)
            tar_color = 0
            continue
        temp = two_point_length(tuple1, val)
        if temp < min_color:
            min_color = temp
            tar_color = i
    # face sub-color
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
        if (tar_face/4) == 0:
            return ('LW', webcolors.rgb_to_hex(face_total_list[tar_face]))
        if (tar_face/4) == 1:
            return ('LC', webcolors.rgb_to_hex(face_total_list[tar_face]))
        if (tar_face/4) == 2:
            return ('ME', webcolors.rgb_to_hex(face_total_list[tar_face]))
        if (tar_face/4) == 3:
            return ('DA', webcolors.rgb_to_hex(face_total_list[tar_face]))
    if (tar_color/10) == 0:
        return ('PK', webcolors.rgb_to_hex(color_total_list[tar_color]))
    if (tar_color/10) == 1:
        return ('RD', webcolors.rgb_to_hex(color_total_list[tar_color]))
    if (tar_color/10) == 2:
        return ('OR', webcolors.rgb_to_hex(color_total_list[tar_color]))
    if (tar_color/10) == 3:
        return ('PU', webcolors.rgb_to_hex(color_total_list[tar_color]))
    return (None, None)


def cal_color_tag(title, hexa):
    """ return closest sub_color with given input """
    if title == 'lip':
        item_rgb = hex_into_rgb(hexa)
        return min_len(item_rgb)
    return -1
