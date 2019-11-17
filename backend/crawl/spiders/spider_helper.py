""" Help Scrapy Aritaum Spider for multiple product category """


def translate_category(raw_text, category):
    """ get eng value """
    trim_size = {'lip': 12, 'base': 14}
    eng_name = {'lip': {
        "립스틱": "S",
        "립글로즈": "G",
        "립케어/립밤": "B",
        "립틴트": "T",
        "립글로스": "S"
    }, 'base': {
        "쿠션": "CU",
        "파운데이션" : "F",
        "파우더/팩트": "P",
        "프라이머/베이스": "PR",
        "비비/씨씨크림": "B",
        "컨실러" :"C"
    }}
    size = trim_size[category]
    category_ko = raw_text[size:]
    try:
        res = eng_name[category][category_ko]
        return res
    except KeyError:
        return -1
