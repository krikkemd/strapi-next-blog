import { client } from '../apolloClient';
import Link from 'next/link';
import { GET_ALL_POSTS, GET_POSTS_BY_SLUG } from '../graphql/posts';

export default function Post({ post }) {
  console.log(post);

  return (
    <div>
      <Link href='/'>
        <a>Go Home</a>
      </Link>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

// tell next. js how many pages there are
export async function getStaticPaths() {
  // const res = await fetch('http://localhost:1337/posts');
  // const posts = await res.json();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
  });

  const paths = data.posts.map(post => ({
    params: { slug: post.slug },
  }));

  return {
    // paths: [{ params: { slug: post.slug } }],
    paths,
    fallback: true, // false for static generation, true for incremental static generation.
  };
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;
  console.log(slug);

  // const res = await fetch(`http://localhost:1337/posts?slug=${slug}`);
  // const data = await res.json();

  // const post = data[0];

  // console.log(res);

  const { data } = await client.query({
    query: GET_POSTS_BY_SLUG,
    variables: slug,
  });


  const post = data.posts.find(post => post.slug === slug)

  return {
    props: {post},
  };
}
