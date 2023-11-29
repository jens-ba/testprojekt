import React, {useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import { Profiles } from '../DTO/DTO';

var GET_GIVEN_NAME = gql(/* GraphQL */ `
    query GetGivenNames {
        profiles {
            givenName
            surname
        }
    }
`);

export function ProfileList() {
    var { loading, data } = useQuery<Profiles>(
        GET_GIVEN_NAME
    );

    console.log("ProfileList code??");

    return (
        <div>
            <h3>Names of our employees</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Given Name</th>
                            <th>Surname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.profiles.map(profiles => (
                            <tr>
                                <td>{profiles.givenName}</td>
                                <td>{profiles.surname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}