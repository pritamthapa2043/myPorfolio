import React, { useState } from "react";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

interface Tag {
  id: number;
  name: string;
  Icon?: React.FC;
}

interface Project {
  title: string;
  description: string;
  subDescription: string;
  image: string;
  tags: Tag[];
  logo: string;
  navigate: string;
  isViewProject: boolean;
  nda?: string;
}

const Project = ({
  title,
  description,
  subDescription,
  navigate,
  image,
  tags,
  isViewProject,
  nda,
}: Project) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between py-10 space-y-6 sm:space-y-0">
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sand text-sm sm:text-base">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation text-base"
        >
          Read More
          <img src="assets/arrow-right.svg" className="w-5" alt="arrow icon" />
        </button>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          nav={navigate}
          isViewProject={isViewProject}
          closeModal={() => setIsHidden(false)}
          nda={nda}
        />
      )}
    </>
  );
};

export default Project;
