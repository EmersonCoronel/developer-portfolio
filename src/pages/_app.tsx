import type { AppProps } from 'next/app';
import React from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesComponent from "../components/general/Particles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ParticlesComponent id="particles" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
