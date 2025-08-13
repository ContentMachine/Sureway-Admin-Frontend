import { Loader } from "lucide-react";

const LoaderComponent = () => {
  return (
    <div className="py-4 flex items-center justify-center w-full">
      <Loader size={20} className="animate-spin" />
    </div>
  );
};

export default LoaderComponent;
