import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import Post from "../components/Posts";
import Category from "../components/Category";
import Articles from "../components/Articles";

export default function Home({ articles, categories }) {
  console.log('articles:', articles)

  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <Category categories={categories} />
      <Articles articles={articles} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await fetch("http://localhost:4000/articles")
    .then((r) => r.json())
    .then((res) => {
      console.log('res', res.items)
      return res.items
    });

  const categories = await fetch("http://localhost:4000/categories")
    .then((r) => r.json())
    .then((res) => res);

  return {
    props: {
      articles,
      categories,
    },
  };
};
