import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../globals.css";
import ParticlesComponent from "../components/general/Particles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Emerson Coronel - Software Developer</title>
      </Head>
      <ParticlesComponent id="particles" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
