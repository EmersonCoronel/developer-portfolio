// pages/_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesComponent from "../components/general/Particles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Emerson Coronel - Software Developer</title>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Emerson Coronel",
              "url": "https://www.emersoncoronel.com",
              "sameAs": [
                "https://www.linkedin.com/in/emersoncoronel",
                "https://github.com/EmersonCoronel"
              ],
              "jobTitle": "Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Genjo.ai"
              }
            }
          `}
        </script>
      </Head>
      <ParticlesComponent id="particles" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
