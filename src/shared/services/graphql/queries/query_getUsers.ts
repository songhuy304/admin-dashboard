import { gql } from '@apollo/client';
import { GraphQL, Response } from 'typings/response';

type IUser = {
  id: string;
  email: string;
  name: string;
};

type IUserListData = {
  users: Response.Pagination<IUser>;
};

type IUserPayload = {
  page: number;
  per_page: number;
};

// example call api
export const GET_USERS: GraphQL.Type<IUserListData, IUserPayload> = gql`
  query GetUsers($page: Int!, $per_page: Int!) {
    users(page: $page, per_page: $per_page) {
      success
      message
      total
      page
      per_page
      data {
        id
        email
        name
      }
    }
  }
`;
