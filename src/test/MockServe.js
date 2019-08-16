import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { MockLink } from 'apollo-link-mock';

import {SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools'

const typeDefs = `
    type Query{
        getAllZones: [Zone]! 
    }

    type Location {
        type: String!
        coordinates: [[[Float!]]]!
      }

      type Zone {
        _id: ID!
        zone: String!
        location: Location
        price: Float!
        is_active: Boolean
      }

`

const mock = {
    Query:{
        getAllZones:() =>  [
            {
               "zone":"Zone 3",
               "location":{
                  "type":"Polygon",
                  "coordinates":[
                     [
                        [
                           -99.15251255035399,
                           19.418556573558718
                        ],
                        [
                           -99.15933609008789,
                           19.41139249889879
                        ],
                        [
                           -99.1562032699585,
                           19.407021044033193
                        ],
                        [
                           -99.14916515350342,
                           19.40511861494246
                        ],
                        [
                           -99.14461612701415,
                           19.410259170032475
                        ],
                        [
                           -99.14641857147217,
                           19.415763836240053
                        ],
                        [
                           -99.1461181640625,
                           19.42171352317951
                        ],
                        [
                           -99.1532850265503,
                           19.422037309416726
                        ],
                        [
                           -99.15251255035399,
                           19.418556573558718
                        ]
                     ]
                  ],
                  "__typename":"Location"
               },
               "__typename":"Zone"
            },
            {
               "zone":"Zone 2",
               "location":{
                  "type":"Polygon",
                  "coordinates":[
                     [
                        [
                           -99.15251255035399,
                           19.418556573558718
                        ],
                        [
                           -99.15933609008789,
                           19.41139249889879
                        ],
                        [
                           -99.1562032699585,
                           19.407021044033193
                        ],
                        [
                           -99.14916515350342,
                           19.40511861494246
                        ],
                        [
                           -99.14461612701415,
                           19.410259170032475
                        ],
                        [
                           -99.14641857147217,
                           19.415763836240053
                        ],
                        [
                           -99.1461181640625,
                           19.42171352317951
                        ],
                        [
                           -99.1532850265503,
                           19.422037309416726
                        ]
                     ]
                  ],
                  "__typename":"Location"
               },
               "__typename":"Zone"
            },
            {
               "zone":"Bosque",
               "location":{
                  "type":"Polygon",
                  "coordinates":[
                     [
                        [
                           -99.195103,
                           19.424416
                        ],
                        [
                           -99.176135,
                           19.425077
                        ],
                        [
                           -99.176364,
                           19.416109
                        ],
                        [
                           -99.181676,
                           19.406589
                        ],
                        [
                           -99.195481,
                           19.412031
                        ],
                        [
                           -99.195103,
                           19.424416
                        ]
                     ]
                  ],
                  "__typename":"Location"
               },
               "__typename":"Zone"
            }
         ]
    }
}
const schema = makeExecutableSchema({typeDefs})
addMockFunctionsToSchema({
    schema,
    mock
})

function createClient(mocks){
    return new ApolloClient({
        cache: new InMemoryCache,
        link: new MockLink(schema)
    })
}

export default createClient;