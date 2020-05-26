import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder /> : ", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it("should render <BuildControls/> when reciving Ingriedients", () => {
    wrapper.setProps({ ingredients: null });
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  });
});
