import { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />

      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
