import Link from "next/link";
import Image from "next/image";

// const myLoader = ({ src, width, quality }) => {
//   return `http://localhost:3000${src}?w=${width}&q=${quality || 75}`;
// };

export default function Post({ post }) {
  return (
    <div className="card">
      <Image
        // loader={myLoader}
        src={`/${post.cover_image}`}
        alt=""
        width={500}
        height={400}
      />

      <div className="post-date">Posted on {post.date}</div>

      <h3>{post.title}</h3>

      <p>{post.excerpt}</p>

      <Link href={`/posts/${post.id}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
}
