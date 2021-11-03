import Post from "./Posts";

export default function Articles({ articles }) {
  console.log('articles:', articles)
  return (
    <div>
      <div className="flex justify-around flex-wrap mt-8 ">
        {articles.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}
