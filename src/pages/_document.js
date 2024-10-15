// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Emerson Coronel's personal portfolio showcasing projects in full-stack development, AI, and software engineering."
        />
        <link rel="icon" href="/logo.png" />
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
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
