import React from "react";

interface FullScreenPictureProps {
  imageUrl: string;
  alt: string;
}

const FullScreenPicture: React.FC<FullScreenPictureProps> = ({ imageUrl, alt }) => {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "80vh",
        backgroundPosition: "center",
      }}
      role="img"
      aria-label={alt}
    />
  );
};

interface ParagraphTextProps {
  text: string;
}

const ParagraphText: React.FC<ParagraphTextProps> = ({ text }) => {
  return (
    <p className="text-lg text-white text-center px-4 max-w-3xl m-auto mb-8">
      {text}
    </p>
  );
};


interface TitleTextProps {
  text: string;
}

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
  return (
    <h1 className="text-3xl md:text-4xl font-bold text-center text-white my-8">
      {text}
    </h1>
  );
};

interface LargePictureProps {
  imageUrl: string;
  alt: string;
}

const LargePicture: React.FC<LargePictureProps> = ({ imageUrl, alt }) => {
  return (
    <div className="w-full max-w-5xl m-auto my-8">
      <img src={imageUrl} alt={alt} className="w-full h-auto rounded-lg" />
    </div>
  );
};

interface PicturePanelProps {
  images: { imageUrl: string; alt: string }[];
}

const PicturePanel: React.FC<PicturePanelProps> = ({ images }) => {
  return (
    <div className="flex justify-center gap-4 my-8 px-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.imageUrl}
          alt={image.alt}
          className="w-[calc(100%/4-1rem)] h-auto rounded-md object-cover"
        />
      ))}
    </div>
  );
};

export { FullScreenPicture, ParagraphText, TitleText, LargePicture, PicturePanel };
