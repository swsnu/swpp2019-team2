## SWPP fall2019-Team2 
### COSMOS

[![Build Status](https://travis-ci.org/swsnu/swpp2019-team2.svg?branch=dev%2Fmaster)](https://travis-ci.org/swsnu/swpp2019-team2)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team2/badge.svg)](https://coveralls.io/github/swsnu/swpp2019-team2)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team2&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team2)

#### How to Run
```
 Git 에서 프로젝트 clone( git clone {project repo url} )

 {projectFolder}/backend/ 로 들어가서 pip install -r requirements.txt (패키지 종속성 관리)
 
 {projectFolder}/backend/ -> python manage.py makemigrations & python manage.py migrate

 {projectFolder}/backend/ -> python manage.py runserver

 {projectFolder}/frontend/ -> yarn install

 {projectFolder}/frontend/ ->  yarn start

 Cosmos 정상 작동여부 확인

```
#### temporarily User Authentification
- For login, we are currently using a dummy ID & Login 
- ID : swpp@snu.ac.kr
- Password : iluvswpp