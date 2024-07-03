import { graphql } from '@/common/graphql';

export const authenticate = graphql(`
  mutation Login($email: String!, $code: String!, $rememberMe: Boolean) {
    authenticate(
      input: { emailCode: { email: $email, code: $code } }
      rememberMe: $rememberMe
    ) {
      ... on CurrentUser {
        identifier
      }
      ... on InvalidCredentialsError {
        errorCode
        message
        authenticationError
      }
    }
  }
`);

export const requestOneTimeCode = graphql(`
  query Otp($email: String!) {
    requestOneTimeCode(email: $email) {
      __typename
      ... on OneTimeCode {
        value
      }
      ... on RequestOneTimeCodeError {
        errorCode
        message
      }
    }
  }
`);

export const logout = graphql(`
  mutation logout {
    logout {
      success
    }
  }
`);

export const registerCustomerAccount = graphql(`
  mutation SignUp($username: String!, $password: String!) {
    registerCustomerAccount(
      input: { emailAddress: $username, password: $password }
    ) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);
