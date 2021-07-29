/* 
Static generation
- build all files at once
- build all files when one changes

incremental static generation
- server side rendered
- when 1st visit happens: generate the page
- when 2nd+ visits happen: serve static page
*/

import { client } from '../apolloClient';
import { GET_ALL_POSTS } from '../graphql/posts';
import Link from 'next/link';

export default function Home({ posts }) {
  console.log('i am on the client');
  console.log(posts);

  return (
    <div>
      {/* Loop over posts and show them */}
      {posts &&
        posts.map(post => (
          <Link href={`/${post.slug}`} key={post.id}>
            <a>
              <h2>{post.title}</h2>
              <div>{post.user.username}</div>
            </a>
          </Link>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  console.log('i am on the server, look for me in the terminal. not in the client console :)');
  // Get posts from our api
  // const res = await fetch('http://localhost:1337/posts');
  // const posts = await res.json();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
  });
  console.log(data);

  return {
    props: {
      posts: data.posts,
    },
  };
}
