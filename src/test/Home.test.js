import React  from 'react';
import {act} from 'react-dom/test-utils'
import {mount} from 'enzyme';
import {ApolloProvider} from 'react-apollo-hooks'
import {BrowserRouter as Router} from 'react-router-dom'
import createCliente from './MockServe';
import gql from 'graphql-tag';
import Home from '../views/Home'
import MapZones  from '../components/MapZones'



const waitRequest = () => new Promise(resolve => setTimeout(resolve));


describe("<Home/>", () => {
    it("Home render Correctly", () => {
        const client = createCliente(ALL_ZONES_MOCK);
        const componet = mount(
            <ApolloProvider client= {client}>
                <Router>
                    <Home/>
                </Router>
            </ApolloProvider>
        )
        expect(componet).toMatchSnapshot()
    })

    it("Render Map", async() => {
        act(()=>{
            const testRequest  = async () => {
                const client = createCliente(ALL_ZONES_MOCK);
                const componet = mount(
                    <ApolloProvider client= {client}>
                        <Router>
                            <Home/>
                        </Router>
                    </ApolloProvider>
                )
                await waitRequest();
                expect(componet.find(MapZones)).toHaveLenght(1)
            };
            testRequest()
           
        })
        

    })
})