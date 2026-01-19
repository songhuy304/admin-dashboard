import { gql } from '@apollo/client';
import { GraphQL, Response } from 'typings/response';

type IUser = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

type IUserDetailData = {
  user_detail: Response.Common<IUser>;
};

type IUserPayload = {
  id: string;
};

// example call api

export const GET_USER_DETAIL: GraphQL.Type<IUserDetailData, IUserPayload> = gql`
  query GetUserDetail($id: uuid!) {
    user_detail(id: $id) {
      id
      email
      name
      created_at
    }
  }
`;
