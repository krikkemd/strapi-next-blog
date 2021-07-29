import Link from 'next/link';

export default function Post({ post }) {
  console.log(post);

  return (
    <div>
      <Link href='/'>
        <a>Go Home</a>
      </Link>
      <h2>{post.title}</h2>
    </div>
  );
}

// tell next. js how many pages there are
export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/posts');
  const posts = await res.json();

  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }));

  return {
    // paths: [{ params: { slug: post.slug } }],
    paths,
    fallback: false, // false for static generation, true for incremental static generation.
  };
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(`http://localhost:1337/posts?slug=${slug}`);
  const data = await res.json();

  const post = data[0];

  console.log(res);

  return {
    props: { post },
  };
}
