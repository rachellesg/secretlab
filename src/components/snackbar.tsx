import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

type SnackbarProps = {
  message: ReactNode;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const Snackbar: React.FC<SnackbarProps> = ({
  isVisible,
  setIsVisible,
  message,
}) => {
  useEffect(() => {
    setIsVisible(isVisible);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, setIsVisible]);

  return (
    <div
      className={`${
        isVisible ? "animate-slide-up " : "hidden "
      }fixed z-50 bottom-3 right-3 bg-green-600 text-white p-4 transition-opacity duration-300`}>
      {message}
    </div>
  );
};

export default Snackbar;
