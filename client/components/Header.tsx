import Link from "next/link";
import { GetStaticProps } from "next";

export default function Header() {
  return (
    <header>
      <div className="flex items-center space-x-4 justify-center p-4 gap-6 font-light shadow-md ">
        <Link href="/">
          <h2 className="hover:underline cursor-pointer">Home</h2>
        </Link>
        <Link href="/articles">
          <h2 className="hover:underline cursor-pointer">Articles</h2>
        </Link>
        <Link href="/admin">
          <h2 className="hover:underline cursor-pointer">Admin</h2>
        </Link>
      </div>
    </header>
  );
}
