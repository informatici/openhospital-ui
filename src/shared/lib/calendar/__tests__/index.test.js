import React from 'react';
import { mount, shallow, render } from 'enzyme';
import Calendar, { config } from '../index';


const dateFakeNow = new Date('2017-11-15T19:00:49.830Z');
const dateFakeLastDayOfNovember = new Date('2017-11-30T19:00:49.830Z');
const lastDayOfMonth = new Date(2017, 11, 0);
let spyDate;


describe('Calendar', () => {
  beforeEach(() => {
    let callNum = 0;
    spyDate = jest.spyOn(global, 'Date')
      .mockImplementation((y, m, d) => {
        callNum += 1;

        // get last day of the month call
        if (y && m && d === 0) {
          return lastDayOfMonth;
        } if ([3, 47].indexOf(callNum) > -1) {
          return dateFakeLastDayOfNovember;
        }

        return dateFakeNow;
      });
  });

  it('default render content', () => {
    global.Date.now = jest.fn().mockImplementation(() => (dateFakeNow));
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();

    expect(instance.state).toEqual({
      current: dateFakeNow,
      ldom: 30,
      selected: dateFakeNow,
    });

    const monthChildren = renderedComponent.find('p.month-title').props().children;
    expect(monthChildren[0]).toBe('November');

    expect(renderedComponent.find('p.month-title > span.month-year')
      .props().children).toBe(2017);
    global.Date.now.mockRestore();
  });

  it('prev function should call instance.updateMonth', () => {
    global.Date.now = jest.fn().mockImplementation(() => (dateFakeNow));

    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const spyUpdateMont = jest.spyOn(instance, 'updateMonth');

    renderedComponent.find('div.month img.month-arrow-left').simulate('click');

    expect(spyUpdateMont).toHaveBeenCalledWith(-1);
    global.Date.now.mockRestore();
  });

  it('next function should call instance.updateMonth', () => {
    global.Date.now = jest.fn().mockImplementation(() => (dateFakeNow));

    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const spyUpdateMont = jest.spyOn(instance, 'updateMonth');

    renderedComponent.find('div.month img.month-arrow-right').simulate('click');

    expect(spyUpdateMont).toHaveBeenCalledWith(1);
    global.Date.now.mockRestore();
  });

  it('updateMonth +1', () => {
    spyDate.mockRestore();
    const mockDate = new Date('2016-05-15T19:00:49.830Z');
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const selectedDate = instance.state.selected;

    instance.setState({ current: mockDate });
    instance.forceUpdate();
    instance.updateMonth(1);
    expect(instance.state).toEqual({
      current: new Date('2016-06-15T19:00:49.830Z'),
      ldom: 30,
      selected: selectedDate,
    });
  });

  it('updateMonth -1', () => {
    spyDate.mockRestore();
    const mockDate = new Date('2016-01-15T19:00:49.830Z');
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const selectedDate = instance.state.selected;

    instance.setState({ current: mockDate });
    instance.forceUpdate();
    instance.updateMonth(-1);
    expect(instance.state).toEqual({
      current: new Date('2015-12-15T19:00:49.830Z'),
      ldom: 31,
      selected: selectedDate,
    });
  });

  it('renderDay w/ default props', () => {
    global.Date.now = jest.fn().mockImplementation(() => (dateFakeNow));
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const dayRendered = instance.renderDay({
      date: { getDate: () => (19) },
    });

    const renderedDay = mount(dayRendered);
    expect(renderedDay.find('p').props()).toEqual({
      onClick: expect.any(Function),
      children: 19,
    });

    // external wrapper
    expect(renderedDay.find('div').at(0).props()).toEqual({
      className: 'day noselect non-current',
      children: expect.any(Array),
      style: {},
    });
    // first internal div
    expect(renderedDay.find('div > div').at(0).props()).toEqual({
      className: '', style: {},
    });
    // second internal div
    expect(renderedDay.find('div > div').at(1).props()).toEqual({
      className: '', style: {},
    });
    global.Date.now.mockRestore();
  });

  it('renderDay w/ today', () => {
    global.Date.now = jest.fn().mockImplementation(() => (dateFakeNow));
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const dayRendered = instance.renderDay({
      date: { getDate: () => (19) },
      today: true,
    });
    const renderedDay = mount(dayRendered);

    // external wrapper
    expect(renderedDay.find('div').at(0).props()).toEqual({
      className: 'day noselect non-current',
      children: expect.any(Array),
      style: {},
    });
    // first internal div
    expect(renderedDay.find('div > div').at(0).props()).toEqual({
      className: 'current', style: { borderColor: '#00C1A6' },
    });
    // second internal div
    expect(renderedDay.find('div > div').at(1).props()).toEqual({
      className: '', style: {},
    });
    global.Date.now.mockRestore();
  });

  it('renderDay w/ selected', () => {
    global.Date.now = jest.fn().mockImplementation(() => (dateFakeNow));
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const dayRendered = instance.renderDay({
      date: { getDate: () => (19) },
      selected: true,
    });
    const renderedDay = mount(dayRendered);

    // external wrapper
    expect(renderedDay.find('div').at(0).props()).toEqual({
      className: 'day noselect non-current',
      children: expect.any(Array),
      style: { color: '#ffffff' },
    });
    // first internal div
    expect(renderedDay.find('div > div').at(0).props()).toEqual({
      className: '', style: {},
    });
    // second internal div
    expect(renderedDay.find('div > div').at(1).props()).toEqual({
      className: 'selected', style: { backgroundColor: '#00C1A6' },
    });
    global.Date.now.mockRestore();
  });

  it('renderDay w/ click on date props', () => {
    global.Date.now = jest.fn().mockImplementation(() => (dateFakeNow));
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const spyDatePicked = jest.spyOn(instance, '_onDatePicked');
    const dayRendered = instance.renderDay({
      date: { getDate: () => (19) },
      month: 10,
    });

    const renderedDay = mount(dayRendered).find('p').simulate('click');
    expect(spyDatePicked).toHaveBeenCalledWith(10, '19');
    global.Date.now.mockRestore();
  });

  it('renderHeaders', () => {
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const spyDatePicked = jest.spyOn(instance, '_onDatePicked');
    const headersRendered = instance.renderHeaders();

    expect(headersRendered.length).toBe(7);
    const headersLabels = headersRendered.map((h) => (h.props.children));
    expect(headersLabels).toEqual(config.weekSubs);
  });

  it('renderDays', () => {
    spyDate.mockRestore();

    const mockDate = new Date('2019-02-22T19:00:49.830Z');
    const renderedComponent = mount(<Calendar />);
    const instance = renderedComponent.instance();
    const spyDatePicked = jest.spyOn(instance, '_onDatePicked');

    /**
     * renderDays returns 42 days both from previous and current months
     * Fetch returned data, split them between currentMonth and otherMonths
     * with array [day, position] and check if result is correct
     */
    const { currentMonth, otherMonths } = instance.renderDays(mockDate).map((d) => ({
      class: d.props.className,
      value: d.props.children[2].props.children,
    })).reduce((acc, item, k) => {
      const key = item.class === 'day noselect' ? 'currentMonth' : 'otherMonths';

      acc[key].push([item.value, k])

      return acc;
    }, { currentMonth: [], otherMonths: [] });

    /**
      Mocked date: 2019-02-22
      February 2019 begins with friday,
      so it means calendar should display
      first 5 positions [0-4] are from january
      and last 9 positions [33 - 41] are from
      march

      February 2019;

      Su Mo Tu We Th Fr Sa
                     1  2
      3  4  5  6  7  8  9
      10 11 12 13 14 15 16
      17 18 19 20 21 22 23
      24 25 26 27 28
      */
    // days belonging to current month
    expect(currentMonth.length).toBe(28);
    expect(currentMonth).toEqual([
      [1, 5], [2, 6], [3, 7], [4, 8], [5, 9],
      [6, 10], [7, 11], [8, 12], [9, 13], [10, 14],
      [11, 15], [12, 16], [13, 17], [14, 18],
      [15, 19], [16, 20], [17, 21], [18, 22],
      [19, 23], [20, 24], [21, 25], [22, 26],
      [23, 27], [24, 28], [25, 29], [26, 30],
      [27, 31], [28, 32]
    ]);
    // days belonging to other months
    expect(otherMonths.length).toBe(14);
    expect(otherMonths).toEqual([
      [27, 0], [28, 1], [29, 2], [30, 3], [31, 4],
      [1, 33], [2, 34], [3, 35], [4, 36], [5, 37],
      [6, 38], [7, 39], [8, 40], [9, 41]
    ]);
  });
});


describe('config', () => {
  beforeEach(() => {
    spyDate = jest.spyOn(global, 'Date')
      .mockImplementation(() => (dateFakeNow));
  });

  it('config content', () => {
    expect(config.months.length).toBe(12);
    expect(config.monthSubs.length).toBe(12);
    expect(config.weeks.length).toBe(7);
    expect(config.weekSubs.length).toBe(7);
    expect(config.today()).toEqual(dateFakeNow);
    expect(spyDate).toHaveBeenCalledWith();
  });
});