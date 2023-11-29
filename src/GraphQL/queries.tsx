import { gql } from '@apollo/client';

export const GET_COMPLETE_PROFILE = gql`
  query employeeFromEmail($userEmail: String!) {
    profiles (where: {email: {contains: $userEmail}}) {
      __typename
      surname
      profileName
      id
      givenName
      dateOfBirth
      email
      employeeTags {
        tag {
          name
          tagType {
            name
            displayAsCompetence
          }
        }
      }
      occupations {
        company {
          description
          name
        }
        description
        endDate
        id
        location
        name
        startDate
      }
    }
  }
`;


export const GET_SCHOOLS = gql`
query schoolsFromUser(
    $userEmail: String! 
    $userProfile: String!
    ) {
    schoolsFromUser(
        userEmail: $userEmail
        userProfile: $userProfile
    ){
      name
      description
    }
  }
`;

export const GET_PROFILE_NAME = gql`
  query employeeFromEmail( $userEmail: String! ) {
    profiles(  where: { email: { contains: $userEmail } } ){
    profileName
    }
  }`;


export const GET_PROFILE = gql`
  query employee(
    $userEmail: String!
    $userProfile: String!
    ) {
      employee(
        userEmail: $userEmail
        userProfile: $userProfile)
    {
      givenName
      surname
      dateOfBirth
      presentation
      driversLicenseType
    }
  }`;


export const GET_OCCUPATIONS = gql`
query occupationFromUser(
  $userEmail: String! 
  $userProfile: String!
  ) {
  occupationFromUser(
    userEmail: $userEmail
    userProfileName: $userProfile)
  {
    name
    startDate
    endDate
    description
  }
}`; 

export const GET_PROFILE_PICTURE = gql`
query profilePictureFromEmail(
  $userEmail: String!
  ) {
  profilePictureFromEmail(
    userEmail: $userEmail)
}`;