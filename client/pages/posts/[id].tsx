import { GetStaticPaths, GetStaticProps } from "next";
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

  return (
    <div className="h-full p-2 relative ">
      <Link href="/">
        <a className="m-4">Go Back</a>
      </Link>
      <div className="h-full flex flex-col items-center">
        <h1 className="my-4">{article_title}</h1>
        <div className="py-4">Posted on {article_createdAt}</div>
        <Image
          className="absolute inset-0 "
          src={`/images/posts/${article_bg_img}`}
          alt=""
          width={500}
          height={300}
          layout="responsive"
        />
        <p className="w-2/3  text-left leading-loose ">{article_text}</p>
      </div>
    </div>
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
