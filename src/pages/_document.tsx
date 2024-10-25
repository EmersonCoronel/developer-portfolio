import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Emerson Coronel's personal portfolio showcasing projects in full-stack development, AI, and software engineering."
        />

        <link rel="icon" href="https://assets.emersoncoronel.com/images/logo.png" />

        <link rel="preload" href="https://assets.emersoncoronel.com/images/emerson-coronel.webp" as="image" />

        <link rel="preload" href="https://assets.emersoncoronel.com/images/project-cards/aristotle.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/project-cards/typetest.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/project-cards/catan-board.webp" as="image" />

        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/aristotle.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/einstein.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/napoleon.webpg" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/cleopatra.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/davinci.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/confucius.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/darwin.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/backgrounds/rebbe.webp" as="image" />

        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/tiles/desert.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/tiles/hill.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/tiles/field.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/tiles/mountain.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/tiles/pasture.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/tiles/forest.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/2.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/3.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/4.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/5.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/6.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/8.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/9.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/10.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/11.webp" as="image" />
        <link rel="preload" href="https://assets.emersoncoronel.com/images/catan/numbers/12.webp" as="image" />
      </Head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
