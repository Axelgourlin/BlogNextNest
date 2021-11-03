import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import Post from "../components/Posts";

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="posts">
        {allPostsData.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await fetch("http://localhost:4000/articles")
    .then((r) => r.json())
    .then((res) => res.items);

  return {
    props: {
      allPostsData,
    },
  };
};
