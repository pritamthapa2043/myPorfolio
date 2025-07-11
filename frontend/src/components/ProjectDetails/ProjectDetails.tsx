import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

interface Tag {
  id: number;
  name: string;
  Icon?: React.FC;
}

interface ProjectDetails {
  title: string;
  description: string;
  subDescription: string;
  image: string;
  tags: Tag[];
  nav: string;
  isViewProject: boolean;
  closeModal: () => void;
  nda?: string;
}

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  nav,
  isViewProject,
  nda,
  closeModal,
}: ProjectDetails) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto backdrop-blur-sm px-4 sm:px-0">
      <motion.div
        className="relative w-full max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" className="w-6 h-6" alt="Close" />
        </button>

        {/* Project image */}
        <img
          src={image}
          alt={title}
          className="w-full rounded-t-2xl object-cover"
        />

        {/* Project text content */}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          <p className="mb-3 font-normal text-neutral-400">{subDescription}</p>
          {nda && (
            <p className="mb-3 font-normal italic text-neutral-400">{nda}</p>
          )}

          {/* Tags and View Project */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4">
            <div className="flex gap-3 flex-wrap">
              {tags.map(
                (tag) =>
                  tag.Icon && (
                    <span
                      className="rounded-lg px-2 hover-animation"
                      title={tag.name}
                      key={tag.id}
                    >
                      <tag.Icon />
                    </span>
                  )
              )}
            </div>
            {isViewProject && (
              <button
                onClick={() => {
                  closeModal();
                  navigate(nav);
                }}
                className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
              >
                View Project
                <img
                  src="assets/arrow-up.svg"
                  className="size-4"
                  alt="arrow icon"
                />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
