export default function Category({ categories }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 bg-hero-bg bg-center bg-cover h-64">
      <h2 className="m-8 text-4xl font-serif">My Blog</h2>
      <ul className="flex space-x-16 font-light text-lg text-white">
        {categories.map((category) => (
          <li key={category.category_id} className="cursor-pointer">{category.category_name}</li>
        ))}
      </ul>
    </div>
  );
}
