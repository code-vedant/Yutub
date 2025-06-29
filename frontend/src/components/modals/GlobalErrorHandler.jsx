import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearError } from "../../store/globalError.js";

const GlobalErrorHandler = () => {
    const message = useSelector((state) => state.globalError?.message);

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.error(message);
      dispatch(clearError());
    }
  }, [message, dispatch]);

  return null;
};

export default GlobalErrorHandler;
