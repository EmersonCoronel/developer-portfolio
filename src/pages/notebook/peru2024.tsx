import React, { useEffect, useState } from "react";
import { FullScreenPicture, ParagraphText, TitleText, LargePicture, PicturePanel } from "../../components/notebook/notebook-components";

const Peru2024: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const imageUrls = [
    "https://assets.emersoncoronel.com/images/notebook/peru2024/peru-main.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-main.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-1.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-2.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-3.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-2.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-1.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-3.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-6.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-7.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-4.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-1.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-8.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-7.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-1.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-2.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-3.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-4.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/wanderer-1.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/wanderer-2.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-5.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-10.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-13.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/machu-2.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/machu-1.webp",
    "https://assets.emersoncoronel.com/images/notebook/peru2024/machu-4.webp",
  ];
  

  useEffect(() => {
    preloadImages(imageUrls).then(() => {
      setIsLoading(false);
    });
  }, []);

  const preloadImages = (imageUrls: string[]): Promise<unknown[]> => {
    return Promise.all(
      imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  };

  if (isLoading) {
    // Show a spinner or loading screen while images are preloading
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p> {/* You can replace this with a spinner component */}
      </div>
    );
  }
  
  return (
    <div>
      {/* Full screen header image */}
      <FullScreenPicture
        imageUrl="https://assets.emersoncoronel.com/images/notebook/peru2024/peru-main.webp"
        alt="Machu Picchu in Peru"
      />

      <TitleText text="Peru, November 2024" />

      <ParagraphText
        text="The jungle, the desert, and the mountains. The food, the people, and the culture. My trip to Peru was everything what I wanted travel to be."
      />

      {/* Section: The Amazon */}
      <TitleText text="The Amazon" />

      <LargePicture
        imageUrl="https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-main.webp"
        alt="Amazon Rainforest"
      />

      <ParagraphText
        text="The Amazon felt like the purest form of adventure--vast, unpredictable, and teeming with life."
      />

      <PicturePanel
        images={[
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-2.webp", alt: "Amazon 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-1.webp", alt: "Amazon 2" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/amazon-3.webp", alt: "Amazon 3" },
        ]}
      />

      <ParagraphText
        text="The animals of the Amazon were a highlight of the entire trip. I got to hold an Amazonian native kid's pet sloth, photograph a toucan from just a couple feet away, and play with monkeys who crawled all over me."
      />

      <PicturePanel
        images={[
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-2.webp", alt: "Amazon animal 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-1.webp", alt: "Amazon animal 2" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-3.webp", alt: "Amazon animal 4" },
        ]}
      />

      <TitleText text="The Desert" />

      <LargePicture
        imageUrl="https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-6.webp"
        alt="Desert in Peru"
      />

      <ParagraphText
        text="The desert was endless sand dunes, quiet and lifeless—-a sharp contrast to the vibrancy of the Amazon."
      />

      <PicturePanel
        images={[
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-7.webp", alt: "Desert view 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-4.webp", alt: "Desert view 2" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-1.webp", alt: "Desert view 3" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/huacachina-8.webp", alt: "Desert view 4" },
        ]}
      />

      <ParagraphText
        text="The dune buggies were pure adrenaline, catching air over the sand dunes and holding on for dear life."
      />

      <TitleText text="The Mountains" />

      <LargePicture
        imageUrl="https://assets.emersoncoronel.com/images/notebook/peru2024/inca-7.webp"
        alt="Peruvian Andes Mountains"
      />

      <ParagraphText
        text="The highlight of my trip to Peru was hiking the Inca Trail. Renowned as one of the most famous treks in the world, this four-day journey begins in Cusco and winds through stunning mountain landscapes, ultimately leading to the legendary Machu Picchu--the same path once walked by the Incas themselves."
      />

      <PicturePanel
        images={[
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-1.webp", alt: "Mountain view 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-2.webp", alt: "Mountain view 2" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-3.webp", alt: "Mountain view 3" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-4.webp", alt: "Mountain view 4" },
        ]}
      />

      <ParagraphText
        text="As we ascended the Andes, every view felt like it belonged on a postcard. The mountains stretched endlessly, and the thin air at 13,800 feet reminded me just how high we were-—quite literally breathtaking."
      />

      <PicturePanel
        images={[
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/wanderer-1.webp", alt: "Wanderer view 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/wanderer-2.webp", alt: "Wanderer view 2" },
        ]}
      />

      <ParagraphText
        text="Here at the highest point of the trek I took a picture imitating my favorite painting. In the heights of the Andes, I felt like The Wanderer Above the Sea of Fog."
      />

      <PicturePanel
        images={[
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/animal-5.webp", alt: "Llama 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-10.webp", alt: "Selfie 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/inca-13.webp", alt: "Mountain 5" },
        ]}
      />

      <ParagraphText
        text="And of course, a trip to Peru is not complete without visiting Machu Picchu. Even after four days of trekking through beautiful landscapes, Machu Picchu was a sight to behold."
      />

      <PicturePanel
        images={[
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/machu-2.webp", alt: "Machu 1" },
          { imageUrl: "https://assets.emersoncoronel.com/images/notebook/peru2024/machu-1.webp", alt: "Machu 2" },
        ]}
      />

      <ParagraphText
        text="When I graduated from college, I was searching for something big--an adventure, a connection to the unknown, and a way to push myself far beyond my comfort zone. My time in Peru gave me all of that and more."
      />

      <LargePicture
        imageUrl="https://assets.emersoncoronel.com/images/notebook/peru2024/machu-4.webp"
        alt="Final mountain view in Peru"
      />
    </div>
  );
};

export default Peru2024;
