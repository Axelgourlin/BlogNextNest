import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Link from "next/link";
import Image from "next/image";

export default function PostPage({
  postData: {
    id,
    article_title,
    article_text,
    article_bg_img,
    article_createdAt,
  },
}) {
  // const myLoader = ({ src, width, quality }) => {
  //   return `http://localhost:3000${src}?w=${width}&q=${quality || 75}`;
  // };

  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{article_title}</h1>
        <div className="post-date">Posted on {article_createdAt}</div>
        <Image
          // loader={myLoader}
          src={`/${article_bg_img}`}
          alt=""
          width={500}
          height={300}
          layout="responsive"
        />
        <div className="post-body">{article_text}</div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await fetch("http://localhost:4000/articles")
    .then((r) => r.json())
    .then((res) => res.items);
  return {
    paths: paths.map((path) => ({
      params: { id: path.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await fetch(`http://localhost:4000/articles/${params.id}`)
    .then((r) => r.json())
    .then((res) => {
      return res;
    });
  return {
    props: {
      postData,
    },
  };
};
