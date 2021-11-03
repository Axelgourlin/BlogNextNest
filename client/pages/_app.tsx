import { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/global.css";
// import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Header />

      <main className="mx-auto text-gray-700 bg-gray-100 h-full">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default App;
