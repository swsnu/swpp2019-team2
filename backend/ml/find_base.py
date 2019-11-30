""" finds closest base product """

def hex_into_rgb(hexa):
    """ change hex value into rgb value """
    if hexa[0] == '#':
        hexa = hexa[1:]
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


def best_match(base_list, ml_result):
    """ find best match base product """
    result = tuple(ml_result)
    rgb_list = [] 
    for product in base_list:
        rgb_list.append(hex_into_rgb(product))
    best_base = -1
    min_len = -1
    temp = -1
    i = -1
    for product in rgb_list:
        i+=1
        if best_base == -1:
            best_base = 0
            min_len = two_point_length(product, result)
            continue
        temp = two_point_length(product, result)
        if temp < min_len:
            best_base = i
            min_len = temp
    return best_base
