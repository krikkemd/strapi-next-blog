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

export const GET_POSTS_BY_SLUG = gql`
query GetPostsBySlug($slug: String) {
  posts(where: {slug: $slug}) {
    id
    title
    body
    slug 

    user {
      username
    }

    comments {
      id
      created_at
    }
  }
}
`;
