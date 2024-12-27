import React from "react";
import Header from "../components/general/Header";
import ProjectCard from "../components/home/ProjectCard";
import entries from "../components/notebook/entries"

const Notebook: React.FC = () => {
  return (
    <div> 
      <Header />
      <main className="p-4">
        <h1 className="text-center text-3xl font-bold mb-8">Journal Index</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry, index) => (
            <ProjectCard
              key={index}
              title={entry.title}
              imageUrl={entry.imageUrl}
              link={entry.link}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notebook;
