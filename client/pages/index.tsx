import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import Post from "../components/Posts";

export default function Home({ allPostsData }) {
  console.log("allPostsData:", allPostsData);
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
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};
