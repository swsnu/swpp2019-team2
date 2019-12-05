## Crawling Data

### Prerequisite

- Install Chrome Driver from [Here](https://sites.google.com/a/chromium.org/chromedriver/downloads)
- echo $PATH
- move chromedriver into one of $PATH directory


### How to Run Crawler

```
/Project Root
cd ./backend
pip -r install requirements.txt
cd crawl
scrapy crawl aritaum-lip
scrapy crawl aritaum-base
scrapy crawl aritaum-cheek
scrapy crawl mac-lip
scrapy crawl mac-base
scrapy crawl mac-cheek
```

then, cralwed data will be automatically saved in Django DB!

### Crawled Website

https://www.aritaum.com/main.do
https://www.maccosmetics.co.kr/

### Framework

- Scrapy
- Selenium

### Progress
 - aritaum-lip, mac-lip, aritaum-cheek, mac-cheek : done everything
 - aritaum-base, mac-base : done except color categorization (by WARM tone, COOl tone)
