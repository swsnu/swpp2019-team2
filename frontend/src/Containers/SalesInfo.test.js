import React from "react";
import { shallow, mount } from "enzyme";
import SalesInfo from "./SalesInfo";

describe("<SalesInfo />", () => {
  it("should show calander", () => {
    const component = shallow(<SalesInfo />);
    const wrapper = component.find("BigCalendar");
    expect(wrapper.length).toBe(1);
  });
});
