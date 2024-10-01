import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  widthFull?: boolean;
  className?: string;
};

const LoadingButton = ({ widthFull = false, className }: Props) => {
  return (
    <Button
      type="button"
      className={`${widthFull && "w-full cursor-not-allowed"} ${className}`}
    >
      <Loader2 className={`mr-2 h-4 w-4 animate-spin`} />
      Loading...
    </Button>
  );
};

export default LoadingButton;
