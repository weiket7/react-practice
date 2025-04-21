import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'


//need export class BurgerBuilder
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({
    adapter: new Adapter(),
})

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        //add onInitIngredients using setProps is too late as it's after component has been instantiated
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    })

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ings: { salad: 0}
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})