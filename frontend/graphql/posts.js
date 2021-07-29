import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      body
      created_at
      slug

      user {
        id
        username
      }

      comments {
        id
        title
        body
        user {
          id
          username
        }
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query GetSinglePost($slug: String!) {
    post(slug: $slug) {
      id
      title
      body
      created_at

      user {
        id
        username
      }

      comments {
        id
        title
        body
        user {
          id
          username
        }
      }
    }
  }
`;
