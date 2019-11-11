#pink color 
pink_pink = 'FC0FC0'
pink_ruby = 'E0115F'
pink_ultra = 'FF6FFF'
pink_thulian = 'FDE6FA1'
pink_magenta = 'FF0090'
pink_rosepink = 'FF66CC'
pink_lavender = 'FBAED2'
pink_creamy = 'FF69B4'
pink_fuchsia = 'FF00FF'
pink_frenchrose = 'F64A8A'
pink_cerise = 'DE3163'
pink_carnation = 'FFA6C9'
pink_brick = 'FB607F'
pink_amaranth = 'F19CBB'
pink_taffy = 'F987C5'
pink_bubblegum = 'FE5BAC'
pink_hotpink = 'F81894'
pink_punch = 'EC5578'
pink_lemonade = 'FDB9C8'
pink_flamingo = 'FCA3B7'
pink_dict = {'pink_pink':'FC0FC0', 'pink_ruby':'E0115F', 'pink_ultra':'FF6FFF', 'pink_thulian':'FDE6FA1',
            'pink_magenta':'FF0090', 'pink_rosepink': 'FF66CC', 'pink_lavender':'FBAED2', 'pink_creamy':'FF69B4',
            'pink_fuchsia':'FF00FF', 'pink_frenchrose':'F64A8A', 'pink_cerise':'DE3163', 'pink_carnation':'FFA6C9',
            'pink_brick':'FB607F', 'pink_amaranth':'F19CBB', 'pink_taffy':'F987C5', 'pink_bubblegum':'FE5BAC',
            'pink_hotpink':'F81894', 'pink_punch':'EC5578', 'pink_lemonade':'FDB9C8', 'pink_flamingo':'FCA3B7'}

#red color
red_red = 'D30000'
red_salmon = 'FA8072'
red_scarlet = 'FF2400'
red_barnred = '7C0A02'
red_imperial = 'ED2939'
red_indianred = 'CD5C5C'
red_chili = 'C21807'
red_firebrick = 'B22222'
red_maroon = '800000'
red_redwood = 'A45A52'
red_raspberry = 'D21F3C'
red_candyapple = 'FF0800'
red_ferrari = 'FF2800'
red_persian = 'CA3433'
red_usflag = 'BF0A30'
red_carmine = '960019'
red_burgandy = '8D021F'
red_crimson = 'B80F0A'
red_sangria = '5E1914'
red_mahogany = '420D09'
red_dict = {'red_red':'D30000', 'red_salmon':'FA8072', 'red_scarlet':'FF2400', 'red_barnred':'7C0A02',
            'red_imperial':'ED2939', 'red_indianred': 'CD5C5C', 'red_chili':'C21807', 'red_firebrick':'B22222',
            'red_maroon':'800000', 'red_redwood':'A45A52', 'red_raspberry':'D21F3C', 'red_candyapple':'FF0800',
            'red_ferrari':'FF2800', 'red_persian':'CA3433', 'red_usflag':'BF0A30', 'red_carmine':'960019',
            'red_burgandy':'8D021F', 'red_crimson':'B80F0A', 'red_sangria':'5E1914', 'red_mahogany':'420D09'}

#orange color
orange_orange = 'FC6600'
orange_gold = 'F9A602'
orange_goldenrod = 'DBA520'
orange_pumpkin = 'FF7417'
orange_fire = 'FDA50F'
orange_ochre = 'CC7722'
orange_burntorange = '964000'
orange_dijon = 'C49102'
orange_tangerine = 'F9812A'
orange_tiger = 'FD6A02'
orange_honey = 'EB9605'
orange_carrot = 'EF7215'
orange_amber = 'FFBF00'
orange_apricot = 'EF820D'
orange_bronze = 'B1560F'
orange_cider = 'B3672B'
orange_clay = '813F0B'
orange_rust = '8B4000'
orange_amber2 = '883000'
orange_spice = '793802'
orange_dict = {'orange_orange':'FC6600', 'orange_gold':'F9A602', 'orange_goldenrod':'DBA520', 'orange_pumpkin':'FF7417',
            'orange_fire':'FDA50F', 'orange_ochre': 'CC7722', 'orange_burntorange':'964000', 'orange_dijon':'C49102',
            'orange_tangerine':'F9812A', 'orange_tiger':'FD6A02', 'orange_honey':'EB9605', 'orange_carrot':'EF7215',
            'orange_amber':'FFBF00', 'orange_apricot':'EF820D', 'orange_bronze':'B1560F', 'orange_cider':'B3672B',
            'orange_clay':'813F0B', 'orange_rust':'8B4000', 'orange_amber2':'883000', 'orange_spice':'793802'}

def hex_into_rgb(hexa):
    r = hexa[0:2]
    g = hexa[2:4]
    b = hexa[4:]
    hex_r = '0x' + r
    hex_g = '0x' + g
    hex_b = '0x' + b
    rgb_r = int(hex_r,16)
    rgb_g = int(hex_g,16)
    rgb_b = int(hex_b,16)
    rgb = (rgb_r, rgb_g, rgb_b)
    return rgb


def two_point_length(t1, t2):
    sum = 0
    sum += pow(t1[0]-t2[0],2)
    sum += pow(t1[1]-t2[1],2)
    sum += pow(t1[2]-t2[2],2)
    len = pow(sum,1/2)
    return len

def min_len(t1):
    pink_val = pink_dict.values()
    pink_key = list(pink_dict.keys())
    red_val = red_dict.values()
    red_key = list(red_dict.keys())
    orange_val = orange_dict.values()
    orange_key = list(orange_dict.keys())
    min_pink = -1
    tar_pink = -1
    min_red = -1
    tar_red = -1
    min_orange = -1
    tar_orange = -1
    i=-1
    for val in pink_val:
        i += 1
        if(min_pink == -1):
            min_pink = two_point_length(t1, hex_into_rgb(val))
            tar_pink = 0
            continue;
        else:
            temp = two_point_length(t1, hex_into_rgb(val))
            if(temp < min_pink):
                min_pink = temp
                tar_pink = i
    i = -1
    for val in red_val:
        i += 1
        if(min_red == -1):
            min_red = two_point_length(t1, hex_into_rgb(val))
            tar_red = 0
            continue;
        else:
            temp = two_point_length(t1, hex_into_rgb(val))
            if(temp < min_red):
                min_red = temp
                tar_red = i
    i = -1
    for val in orange_val:
        i += 1
        if(min_orange == -1):
            min_orange = two_point_length(t1, hex_into_rgb(val))
            tar_orange = 0
            continue;
        else:
            temp = two_point_length(t1, hex_into_rgb(val))
            if(temp < min_orange):
                min_orange = temp
                tar_orange = i

    if(min_pink <= min_red and min_pink <= min_orange):
        return ('pink', pink_key[tar_pink])
    elif(min_red <= min_pink and min_red <= min_orange):
        return ('red', red_key[tar_red])
    else:
        return ('orange', orange_key[tar_orange])





def cal_color_tag(hexa):
    item_rgb = hex_into_rgb(hexa)
    return(min_len(item_rgb))



    