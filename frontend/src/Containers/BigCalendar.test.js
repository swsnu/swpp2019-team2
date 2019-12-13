import React from 'react';
import { shallow } from 'enzyme';
import BigCalendar from './BigCalendar';

const stubEvent = {
  title: 'dummy title',
  header: 'dummy header',
  detail: 'dummy detail',
};
const mockState = [
  [
    {
      start: new Date('2019-12-09'),
      end: new Date('2019-12-15'),
      title: 'MAC',
      header: '20주년 맥 서울파우치 이벤트',
      detail: '장소: 전국 맥 백화점 매장\n내용: 맥20 아이코닉 제품 포함 8만원 이상 구매시 \n 맥 서울파우치 증정',
    },
  ],
  [
    {
      start: new Date('2019-12-11'),
      end: new Date('2019-12-14'),
      title: 'ARITAUM',
      header: '2019년 결산 세일',
      detail: '19년 아리따움 연말 결산 세일 혜택 \n 일반: 15% ~ 60% \n 스마트클럽: 25% ~ 60%',
    },
  ],
  [
    {
      start: new Date('2019-12-09'),
      end: new Date('2019-12-31'),
      title: 'MAMONDE',
      header: '아리따움 완판 기념 앵콜 요청 이벤트',
      detail: '1. 19500원에 1일 1팩 (환절기 고보습 마스크 등) \n 2. 클리어런스 팩 최대 70% 할인',
    },
  ],
  [
    {
      start: new Date('2019-12-09'),
      end: new Date('2019-12-31'),
      title: 'DEARDAHLIA',
      header: '디어달리아 신제품 출시기념 한정 GIFT',
      detail: '디어달리아 메이크업 제품 구매 시 \n 미니벨벳 립 무스 구아바 1ml 증정 \n(재고 소진 시까지)',
    },
  ],
  [
    {
      start: new Date('2019-11-30'),
      end: new Date('2019-12-31'),
      title: 'PRIMERA',
      header: 'Happy 아리따움, Merry 프리메라',
      detail: '1. 알파인 베리 라인 제품 15% 할인 \n 2. 프리메라 알파인 베리 워터리 제품 구매 시 \n 프리메라 기초 스킨케어 4종 KIT 증정',
    },
  ],
];

describe('<BigCalender />', () => {
  it('should show calander', () => {
    const component = shallow(<BigCalendar />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
  });

  it('should show calander', () => {
    const component = shallow(<BigCalendar />);
    let button;
    for (let i = 1; i <= 5; i++) {
      button = component.find(`#button${i}`);
      button.simulate('click');
      expect(component.state().selectedEvent).toEqual(mockState[i - 1]);
    }
  });

  it('should show popup when select specific event', () => {
    const mockSwal = jest.fn();
    const component = shallow(<BigCalendar />);
    const calendar = component.find('#BigCalendar');
    calendar.prop('onSelectEvent')(stubEvent, mockSwal());
    expect(mockSwal).toHaveBeenCalledTimes(1);
  });
});
