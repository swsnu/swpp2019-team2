/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import swal from 'sweetalert';
import './BigCalendar.css';


const localizer = momentLocalizer(moment);
const formats = {
  monthHeaderFormat: 'YYYY. MM',
};

const MAC = [
  {
    start: new Date('2019-12-09'),
    end: new Date('2019-12-15'),
    title: 'MAC',
    header: '20주년 맥 서울파우치 이벤트',
    detail: '장소: 전국 맥 백화점 매장\n내용: 맥20 아이코닉 제품 포함 8만원 이상 구매시 \n 맥 서울파우치 증정',
  },
];
const ARITAUM = [
  {
    start: new Date('2019-12-11'),
    end: new Date('2019-12-14'),
    title: 'ARITAUM',
    header: '2019년 결산 세일',
    detail: '19년 아리따움 연말 결산 세일 혜택 \n 일반: 15% ~ 60% \n 스마트클럽: 25% ~ 60%',
  },
];
const MAMONDE = [
  {
    start: new Date('2019-12-09'),
    end: new Date('2019-12-31'),
    title: 'MAMONDE',
    header: '아리따움 완판 기념 앵콜 요청 이벤트',
    detail: '1. 19500원에 1일 1팩 (환절기 고보습 마스크 등) \n 2. 클리어런스 팩 최대 70% 할인',
  },
];
const DEARDAHLIA = [
  {
    start: new Date('2019-12-09'),
    end: new Date('2019-12-31'),
    title: 'DEARDAHLIA',
    header: '디어달리아 신제품 출시기념 한정 GIFT',
    detail: '디어달리아 메이크업 제품 구매 시 \n 미니벨벳 립 무스 구아바 1ml 증정 \n(재고 소진 시까지)',
  },
];
const PRIMERA = [
  {
    start: new Date('2019-11-30'),
    end: new Date('2019-12-31'),
    title: 'PRIMERA',
    header: 'Happy 아리따움, Merry 프리메라',
    detail: '1. 알파인 베리 라인 제품 15% 할인 \n 2. 프리메라 알파인 베리 워터리 제품 구매 시 \n 프리메라 기초 스킨케어 4종 KIT 증정',
  },
];

const buttonStyle = {
  width: 120,
  height: 30,
  borderRadius: 8,
  marginBottom: 10,
  justifyContent: 'center',
};

class BigCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: MAC,
    };
  }

  render() {
    const { selectedEvent } = this.state;
    return (
      <div className="Calendar" style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <button id="button1" style={buttonStyle} onClick={() => this.setState({ selectedEvent: MAC })}>MAC</button>
          <button id="button2" style={buttonStyle} onClick={() => this.setState({ selectedEvent: ARITAUM })}>ARITAUM</button>
          <button id="button3" style={buttonStyle} onClick={() => this.setState({ selectedEvent: MAMONDE })}>MAMONDE</button>
          <button id="button4" style={buttonStyle} onClick={() => this.setState({ selectedEvent: DEARDAHLIA })}>DEARDAHLIA</button>
          <button id="button5" style={buttonStyle} onClick={() => this.setState({ selectedEvent: PRIMERA })}>PRIMERA</button>
        </div>
        <Calendar
          id="BigCalendar"
          views={['month']}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          formats={formats}
          events={selectedEvent}
          style={{ height: '70vh', width: '140vh', marginLeft: 10 }}
          onSelectEvent={(event) => swal(event.header, event.detail)}
        />
      </div>
    );
  }
}

export default BigCalendar;

// display: 'table-cell'  margin: 'auto'
