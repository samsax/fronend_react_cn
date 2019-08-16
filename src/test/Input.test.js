import React, { Component } from 'react';
import {shallow} from 'enzyme';
import Input from '../components/Input';
import '../setupTests'

describe("<Input/>", () => {

    it("Simple render component", () => {
        const component = shallow(
            <Input 
                name="prueba"
                label="Prueba:"
                type="text"
                value=""
                onChange={()=>{}}
            />
        )

        expect(component).toMatchSnapshot()


    })

    it("Check if propd pass correctly", () => {
        const component = shallow(
            <Input 
                name="prueba"
                label="Prueba:"
                type="text"
                value=""
                onChange={()=>{}}
            />
        )
        expect(component.find('label').text()).toBe("Prueba:")
        expect(component.find('input').filterWhere(
            (item) => item.prop('name')==="prueba")
            ).toHaveLength(1)
        expect(component.find('input').filterWhere(
            (item) => item.prop('type')==="text")
            ).toHaveLength(1)
    })

})