import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleItemClick = (id, name) => {
    navigate(`/project/${name}`, { state: { itemId: id } });
  };

  return { handleItemClick };
};

export const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
