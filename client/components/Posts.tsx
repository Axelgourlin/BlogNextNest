import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
      <Link href={`/posts/${post.id}`}>
        <a>
            <Image className="rounded-t-lg" src={`/${post.article_min_img}`} alt="" width={500}
        height={400} />
        </a>
    </Link>
    <div className="p-5">
      <Link href={`/posts/${post.id}`}>
        <a>
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{post.article_title}</h5>
        </a>
      </Link>
        <p className="font-normal text-gray-700 mb-3">{post.article_resume}</p>
        <Link href={`/posts/${post.id}`}>
          <a className="text-white bg-blue-500 hover:bg-blue-700  font-ligth rounded-sm text-sm px-3 py-1.5 text-center inline-flex items-center">
              Read more
          </a>
        </Link>
    </div>
  </div>
  );
}
