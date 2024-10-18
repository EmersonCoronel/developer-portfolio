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

        <link rel="icon" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/logo.png`} />

        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/emerson-coronel.jpeg`} as="image" />

        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/project-cards/aristotle.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/project-cards/typetest.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/project-cards/catan-board.png`} as="image" />

        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/backgrounds/aristotle.jpg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/backgrounds/einstein.jpg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/backgrounds/napoleon.jpg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/backgrounds/cleopatra.jpg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/backgrounds/confucius.jpg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/backgrounds/darwin.jpeg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/backgrounds/rebbe.jpeg`} as="image" />

        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/desert.svg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/hill.svg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/field.svg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/mountain.svg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/pasture.svg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/tiles/forest.svg`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/2.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/3.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/4.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/5.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/6.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/8.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/9.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/10.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/11.png`} as="image" />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/12.png`} as="image" />
      </Head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
