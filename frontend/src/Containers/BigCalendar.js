/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Select from 'react-select';
import moment from 'moment';
import swal from 'sweetalert';
import './BigCalendar.css';


const localizer = momentLocalizer(moment);
const formats = {
  monthHeaderFormat: 'YYYY. MM',
};

const customStyles = {
  control: (base) => ({
    ...base,
    width: 160,
    height: 70,
    overflow: 'visible',
  }),

  valueContainer: (base) => ({
    ...base,
    overflow: 'visible',
  }),
};

const options = [
  { value: 'ARITAUM', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537RHU155811506.jpg" width="100px" height="60px" alt="description 13" /> },
  { value: 'MAMONDE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537ldl155718872.jpg" width="100px" height="60px" alt="description 12" /> },
  { value: 'DEARDAHLIA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201908/IMG1564aJR971460368.jpg" width="100px" height="60px" alt="description 16" /> },
  { value: 'PRIMERA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537pBm221973984.jpg" width="100px" height="60px" alt="description 32" /> },
  { value: '16 brand', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537CQS506876427.jpg" width="100px" height="60px" alt="description 1" /> },
  { value: 'SEPbeauty', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wSD506679483.jpg" width="100px" height="60px" alt="description 2" /> },
  { value: 'wet N wild', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549oOb615704527.jpg" width="100px" height="60px" alt="description 3" /> },
  { value: 'REVLON', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549EyB615657222.jpg" width="100px" height="60px" alt="description 4" /> },
  { value: 'BLACK ROUGE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537HXF235192827.jpg" width="100px" height="60px" alt="description 5" /> },
  { value: 'BANILA CO', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201904/IMG1555IHU899265786.jpg" width="100px" height="60px" alt="description 6" /> },
  { value: 'chosungah 22', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201810/IMG1540vyM356599927.jpg" width="100px" height="60px" alt="description 7" /> },
  { value: 'INGA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wwS404695010.jpg" width="100px" height="60px" alt="description 8" /> },
  { value: 'HANYUL', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201511/IMG1448CiZ867136270.jpg" width="100px" height="60px" alt="description 9" /> },
  { value: 'espoir', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201909/IMG1567aNI409940335.png" width="100px" height="60px" alt="description 10" /> },
  { value: 'LANEIGE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201905/IMG1557hLh713746395.jpg" width="100px" height="60px" alt="description 11" /> },
  { value: 'IOPE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537MQf155702813.jpg" width="100px" height="60px" alt="description 14" /> },
  { value: 'EASY PEASY', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201906/IMG1560qht736793377.jpg" width="100px" height="60px" alt="description 15" /> },
  { value: 'piciberry', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537RKu239808627.jpg" width="100px" height="60px" alt="description 17" /> },
  { value: 'KAT MACONIE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201910/IMG1570wkG777403066.png" width="100px" height="60px" alt="description 18" /> },
  { value: 'K-PALETTE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537WYY239596870.jpg" width="100px" height="60px" alt="description 19" /> },
  { value: 'LIPLEASURE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201907/IMG1564Uak133145302.jpg" width="100px" height="60px" alt="description 20" /> },
  { value: 'DEAR DAHLIA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201908/IMG1564aJR971460368.jpg" width="100px" height="60px" alt="description 21" /> },
  { value: 'T:SOME', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201911/IMG1573YXF782637357.jpg" width="100px" height="60px" alt="description 22" /> },
  { value: 'MAKEHEAL', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537Fof234805841.jpg" width="100px" height="60px" alt="description 23" /> },
  { value: 'EUYIRA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537mZq408557115.jpg" width="100px" height="60px" alt="description 24" /> },
  { value: 'HERA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1550GgC592250434.jpg" width="100px" height="60px" alt="description 25" /> },
  { value: 'ILLIYOON', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537ATh155798912.jpg" width="100px" height="60px" alt="description 26" /> },
  { value: 'lilybyred', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537iPC234718762.jpg" width="100px" height="60px" alt="description 27" /> },
  { value: 'BOURJOIS', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537PIM235031169.jpg" width="100px" height="60px" alt="description 28" /> },
  { value: 'RAREKIND', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201909/IMG1568PgL770364475.jpg" width="100px" height="60px" alt="description 29" /> },
  { value: 'gentlecode', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201910/IMG1572JTi486244730.jpg" width="100px" height="60px" alt="description 30" /> },
  { value: 'LET ME SKIN', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537uwZ235815157.jpg" width="100px" height="60px" alt="description 31" /> },
  { value: 'STILA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537eUA234560242.jpg" width="100px" height="60px" alt="description 33" /> },
  { value: 'MAX FACTOR', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201908/IMG1565IbP662287972.jpg" width="100px" height="60px" alt="description 34" /> },
  { value: 'LA MUSE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537Ado235666942.jpg" width="100px" height="60px" alt="description 35" /> },
  { value: 'unpa.Cosmetics', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537efd236798604.jpg" width="100px" height="60px" alt="description 36" /> },
  { value: 'CANMAKE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537jzf234476830.jpg" width="100px" height="60px" alt="description 37" /> },
  { value: 'FARMACY', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537cjX236939216.jpg" width="100px" height="60px" alt="description 38" /> },
  { value: 'gesgep', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wWa506770821.jpg" width="100px" height="60px" alt="description 39" /> },
  { value: 'CARMEX', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201911/IMG1574NBX932526152.jpg" width="100px" height="60px" alt="description 40" /> },
  { value: 'PUPA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549mLI869055029.jpg" width="100px" height="60px" alt="description 41" /> },
];
const infoList = [
  [
    {
      start: new Date('2019-12-11'),
      end: new Date('2019-12-14'),
      title: '아리따움',
      brandName: 'ARITAUM',
      header: '2019년 결산 세일',
      detail: '19년 아리따움 연말 결산 세일 혜택 \n 일반: 15% ~ 60% \n 스마트클럽: 25% ~ 60%',
    },
  ],
  [
    {
      start: new Date('2019-12-09'),
      end: new Date('2019-12-31'),
      title: '마몽드',
      brandName: 'MAMONDE',
      header: '아리따움 완판 기념 앵콜 요청 이벤트',
      detail: '1. 19500원에 1일 1팩 (환절기 고보습 마스크 등) \n 2. 클리어런스 팩 최대 70% 할인',
    },
  ],
  [
    {
      start: new Date('2019-12-09'),
      end: new Date('2019-12-31'),
      title: '디어달리아',
      brandName: 'DEARDAHLIA',
      header: '디어달리아 신제품 출시기념 한정 GIFT',
      detail: '디어달리아 메이크업 제품 구매 시 \n 미니벨벳 립 무스 구아바 1ml 증정 \n(재고 소진 시까지)',
    },
  ],
  [
    {
      start: new Date('2019-11-30'),
      end: new Date('2019-12-31'),
      title: '프리메라',
      brandName: 'PRIMERA',
      header: 'Happy 아리따움, Merry 프리메라',
      detail: '1. 알파인 베리 라인 제품 15% 할인 \n 2. 프리메라 알파인 베리 워터리 제품 구매 시 \n 프리메라 기초 스킨케어 4종 KIT 증정',
    },
  ],
];

class BigCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: [],
    };
  }

  handleChange = (selected) => {
    const selectedInfo = infoList.find((info) => info[0].brandName === selected.value);
    if (selectedInfo === undefined) {
      this.setState({ selectedEvent: [] });
    } else {
      this.setState({ selectedEvent: selectedInfo });
    }
  }

  render() {
    const { selectedEvent } = this.state;
    return (
      <div className="Calendar" style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <Select
            id="select-brand"
            placeholder="select brand..."
            options={options}
            onChange={(selected) => this.handleChange(selected)}
            styles={customStyles}
            maxMenuHeight={500}
          />
        </div>

        <Calendar
          id="BigCalendar"
          views={['month']}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          formats={formats}
          events={selectedEvent}
          style={{
            height: '70vh', width: '120vh', marginLeft: 10, marginTop: 20,
          }}
          onSelectEvent={(event) => swal(event.header, event.detail)}
        />
      </div>
    );
  }
}

export default BigCalendar;
