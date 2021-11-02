import Link from "next/link";

export default function Post({ post }) {
  return (
    <div className="card">
      <img src={post.cover_image} alt="" />

      <div className="post-date">Posted on {post.date}</div>

      <h3>{post.title}</h3>

      <p>{post.excerpt}</p>

      <Link href={`/posts/${post.id}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
}
