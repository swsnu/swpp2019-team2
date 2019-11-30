## Crawling Data

### Prerequisite

- Install Chrome Driver from [Here](https://sites.google.com/a/chromium.org/chromedriver/downloads)

### How to Run Crawler

```
/Project Root
cd ./backend
pip -r install requirements.txt
cd crawl
scrapy crawl aritaum-lip
scrapy crawl aritaum-base
```

then, cralwed data will be automatically saved in Django DB!

### Crawled Website

https://www.aritaum.com/main.do

### Framework

- Scrapy
- Selenium

### Progress
 - aritaum-lip : done everything
 - aritaum-base : done except color categorization
