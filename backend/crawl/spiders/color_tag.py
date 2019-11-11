""" finds closest sub_color tag """

# PINK COLOR
PINK_PINK = 'FC0FC0'
PINK_RUBY = 'E0115F'
PINK_ULTRA = 'FF6FFF'
PINK_THULIAN = 'FDE6FA1'
PINK_MAGENTA = 'FF0090'
PINK_ROSEPINK = 'FF66CC'
PINK_LAVENDER = 'FBAED2'
PINK_CREAMY = 'FF69B4'
PINK_FUCHSIA = 'FF00FF'
PINK_FRENCHROSE = 'F64A8A'
PINK_CERISE = 'DE3163'
PINK_CARNATION = 'FFA6C9'
PINK_BRICK = 'FB607F'
PINK_AMARANTH = 'F19CBB'
PINK_TAFFY = 'F987C5'
PINK_BUBBLEGUM = 'FE5BAC'
PINK_HOTPINK = 'F81894'
PINK_PUNCH = 'EC5578'
PINK_LEMONADE = 'FDB9C8'
PINK_FLAMINGO = 'FCA3B7'
PINK_DICT = {'PINK_PINK': 'FC0FC0', 'PINK_RUBY': 'E0115F', 'PINK_ULTRA': 'FF6FFF', 'PINK_THULIAN': 'FDE6FA1',
             'PINK_MAGENTA': 'FF0090', 'PINK_ROSEPINK': 'FF66CC', 'PINK_LAVENDER': 'FBAED2', 'PINK_CREAMY': 'FF69B4',
             'PINK_FUCHSIA': 'FF00FF', 'PINK_FRENCHROSE': 'F64A8A', 'PINK_CERISE': 'DE3163', 'PINK_CARNATION': 'FFA6C9',
             'PINK_BRICK': 'FB607F', 'PINK_AMARANTH': 'F19CBB', 'PINK_TAFFY': 'F987C5', 'PINK_BUBBLEGUM': 'FE5BAC',
             'PINK_HOTPINK': 'F81894', 'PINK_PUNCH': 'EC5578', 'PINK_LEMONADE': 'FDB9C8', 'PINK_FLAMINGO': 'FCA3B7'}

# RED COLOR
RED_RED = 'D30000'
RED_SALMON = 'FA8072'
RED_SCARLET = 'FF2400'
RED_BARNRED = '7C0A02'
RED_IMPERIAL = 'ED2939'
RED_INDIANRED = 'CD5C5C'
RED_CHILI = 'C21807'
RED_FIREBRICK = 'B22222'
RED_MAROON = '800000'
RED_REDWOOD = 'A45A52'
RED_RASPBERRY = 'D21F3C'
RED_CANDYAPPLE = 'FF0800'
RED_FERRARI = 'FF2800'
RED_PERSIAN = 'CA3433'
RED_USFLAG = 'BF0A30'
RED_CARMINE = '960019'
RED_BURGANDY = '8D021F'
RED_CRIMSON = 'B80F0A'
RED_SANGRIA = '5E1914'
RED_MAHOGANY = '420D09'
RED_DICT = {'RED_RED': 'D30000', 'RED_SALMON': 'FA8072', 'RED_SCARLET': 'FF2400', 'RED_BARNRED': '7C0A02',
            'RED_IMPERIAL': 'ED2939', 'RED_INDIANRED': 'CD5C5C', 'RED_CHILI': 'C21807', 'RED_FIREBRICK': 'B22222',
            'RED_MAROON': '800000', 'RED_REDWOOD': 'A45A52', 'RED_RASPBERRY': 'D21F3C', 'RED_CANDYAPPLE': 'FF0800',
            'RED_FERRARI': 'FF2800', 'RED_PERSIAN': 'CA3433', 'RED_USFLAG': 'BF0A30', 'RED_CARMINE': '960019',
            'RED_BURGANDY': '8D021F', 'RED_CRIMSON': 'B80F0A', 'RED_SANGRIA': '5E1914', 'RED_MAHOGANY': '420D09'}

# ORANGE COLOR
ORANGE_ORANGE = 'FC6600'
ORANGE_GOLD = 'F9A602'
ORANGE_GOLDENROD = 'DBA520'
ORANGE_PUMPKIN = 'FF7417'
ORANGE_FIRE = 'FDA50F'
ORANGE_OCHRE = 'CC7722'
ORANGE_BURNTORANGE = '964000'
ORANGE_DIJON = 'C49102'
ORANGE_TANGERINE = 'F9812A'
ORANGE_TIGER = 'FD6A02'
ORANGE_HONEY = 'EB9605'
ORANGE_CARROT = 'EF7215'
ORANGE_AMBER = 'FFBF00'
ORANGE_APRICOT = 'EF820D'
ORANGE_BRONZE = 'B1560F'
ORANGE_CIDER = 'B3672B'
ORANGE_CLAY = '813F0B'
ORANGE_RUST = '8B4000'
ORANGE_AMBER2 = '883000'
ORANGE_SPICE = '793802'
ORANGE_DICT = {'ORANGE_ORANGE': 'FC6600', 'ORANGE_GOLD': 'F9A602', 'ORANGE_GOLDENROD': 'DBA520', 'ORANGE_PUMPKIN': 'FF7417',
               'ORANGE_FIRE': 'FDA50F', 'ORANGE_OCHRE': 'CC7722', 'ORANGE_BURNTORANGE': '964000', 'ORANGE_DIJON': 'C49102',
               'ORANGE_TANGERINE': 'F9812A', 'ORANGE_TIGER': 'FD6A02', 'ORANGE_HONEY': 'EB9605', 'ORANGE_CARROT': 'EF7215',
               'ORANGE_AMBER': 'FFBF00', 'ORANGE_APRICOT': 'EF820D', 'ORANGE_BRONZE': 'B1560F', 'ORANGE_CIDER': 'B3672B',
               'ORANGE_CLAY': '813F0B', 'ORANGE_RUST': '8B4000', 'ORANGE_AMBER2': '883000', 'ORANGE_SPICE': '793802'}


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
    # pylint: disable=too-many-locals
    pink_val = PINK_DICT.values()
    pink_key = list(PINK_DICT.keys())
    red_val = RED_DICT.values()
    red_key = list(RED_DICT.keys())
    orange_val = ORANGE_DICT.values()
    orange_key = list(ORANGE_DICT.keys())
    min_pink = -1
    tar_pink = -1
    min_red = -1
    tar_red = -1
    min_orange = -1
    tar_orange = -1
    i = -1
    for val in pink_val:
        i += 1
        if min_pink == -1:
            min_pink = two_point_length(tuple1, hex_into_rgb(val))
            tar_pink = 0
            continue
        temp = two_point_length(tuple1, hex_into_rgb(val))
        if temp < min_pink:
            min_pink = temp
            tar_pink = i
    i = -1
    for val in red_val:
        i += 1
        if min_red == -1:
            min_red = two_point_length(tuple1, hex_into_rgb(val))
            tar_red = 0
            continue
        temp = two_point_length(tuple1, hex_into_rgb(val))
        if temp < min_red:
            min_red = temp
            tar_red = i
    i = -1
    for val in orange_val:
        i += 1
        if min_orange == -1:
            min_orange = two_point_length(tuple1, hex_into_rgb(val))
            tar_orange = 0
            continue
        temp = two_point_length(tuple1, hex_into_rgb(val))
        if temp < min_orange:
            min_orange = temp
            tar_orange = i

    if(min_pink <= min_red and min_pink <= min_orange):
        return ('PK', pink_key[tar_pink])
    if(min_red <= min_pink and min_red <= min_orange):
        return ('RD', red_key[tar_red])
    if(min_orange <= min_pink and min_orange <= min_red):
        return ('OR', orange_key[tar_orange])
    return (None, None)


def cal_color_tag(hexa):
    """ return closest sub_color with given input """
    item_rgb = hex_into_rgb(hexa)
    return min_len(item_rgb)
