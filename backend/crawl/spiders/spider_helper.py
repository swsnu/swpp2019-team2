""" Help Scrapy Aritaum Spider for multiple product category """


def translate_category(raw_text, category):
    """ get eng value """
    trim_size = {'lip': 12, 'base': 14, 'cheek': 13}
    eng_name = {'lip': {
        "립스틱": "LIP_S",
        "립글로즈": "LIP_G",
        "립케어/립밤": "LIP_B",
        "립틴트": "LIP_T",
        "립글로스": "LIP_S"
    }, 'base': {
        "쿠션": "BAS_CU",
        "파운데이션": "BAS_F",
        "파우더/팩트": "BAS_P",
        "프라이머/베이스": "BAS_PR",
        "비비/씨씨크림": "BAS_B",
        "컨실러": "BAS_C"
    }, 'cheek': {
        "블러셔": "CHK_B",
        "브론져": "CHK_C",
        "하이라이터": "CHK_H"
    }}
    size = trim_size[category]
    category_ko = raw_text[size:]
    try:
        res = eng_name[category][category_ko]
        return res
    except KeyError:
        return -1
