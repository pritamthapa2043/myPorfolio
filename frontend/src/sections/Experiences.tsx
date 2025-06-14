import { Timeline } from "../components/Timeline/Timeline";
import { experiences } from "../constants/constants";
const Experiences = () => {
  return (
    <div className="w-full">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
