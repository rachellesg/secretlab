import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

type SnackbarProps = {
  message: ReactNode;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  setVisible,
  message,
}) => {
  useEffect(() => {
    setVisible(visible);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [visible, setVisible]);

  return (
    <div
      className={`${
        visible ? "" : "hidden "
      }fixed bottom-3 right-3 bg-green-600 text-white p-4`}>
      {message}
    </div>
  );
};

export default Snackbar;
