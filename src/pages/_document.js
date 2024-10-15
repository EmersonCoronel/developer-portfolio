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
        <link rel="preload" as="image" href="/images/emerson-coronel.jpeg" />
        <link rel="preload" as="image" href="/images/project-cards/catan-board.png" />
        <link rel="preload" as="image" href="/images/project-cards/aristotle.png" />
        <link rel="preload" as="image" href="/images/project-cards/typetest.png" />
        <link rel="preload" as="image" href="/images/backgrounds/aristotle.jpg" />
        <link rel="preload" as="image" href="/images/backgrounds/cleopatra.jpg" />
        <link rel="preload" as="image" href="/images/backgrounds/confucius.jpg" />
        <link rel="preload" as="image" href="/images/backgrounds/darwin.jpg" />
        <link rel="preload" as="image" href="/images/backgrounds/davinci.jpg" />
        <link rel="preload" as="image" href="/images/backgrounds/einstein.jpg" />
        <link rel="preload" as="image" href="/images/backgrounds/napoleon.jpg" />
        <link rel="preload" as="image" href="/images/backgrounds/rebbe.jpeg" />
      </Head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
