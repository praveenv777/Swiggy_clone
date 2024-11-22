import { useEffect, useState } from "react";
import { MENU_API_URL } from "../Components/constant.js"

const useRestaurantMenuData = (resId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const fetchResMenusData = async () => {
    try {
      const response = await fetch(MENU_API_URL + resId);
      const json = await response.json();

      setRestaurantInfo(json?.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchResMenusData();
  }, []);

  return restaurantInfo;
};

export default useRestaurantMenuData;
