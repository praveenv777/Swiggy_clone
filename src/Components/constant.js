

// Swiggy API URL => getRestaurants
export const swiggy_api_url ="https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"

// Swiggy Menu-list API URL
export const swiggy_menu_api_URL = "https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=";


// Swiggy API to get Restaurant data using foodfire server
export const FOODFIRE_API_URL = `${process.env.REACT_FOODFIRE_APP_BASE_URL}restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING`;

// Swiggy API to get Restaurant Menu data using foodfire server
export const FOODFIRE_MENU_API_URL = `${process.env.REACT_FOODFIRE_APP_BASE_URL}menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=`;

export const shimmer_card_unit = 20;

// shimmer Menu card unit
export const shimmer_menu_card_unit = 4;

// menu items api card type key
export const MENU_ITEM_TYPE_KEY =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
export const RESTAURANT_TYPE_KEY =
  "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";

// Image CDN URL for Restaurant card
export const IMG_CDN_URL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/`;

// Image CDN URL for Restaurant Menu
export const ITEM_IMG_CDN_URL = `${process.env.REACT_MEDIA_ASSETS_BASE_URL}image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/`;

// Swiggy API for to get Restaurant data
export const SWIGGY_API_URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

//  Swiggy API for to get Restaurant Item 
export const MENU_API_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9046136&lng=77.614948&restaurantId=`;

// Swiggy Restaurant Path 
export const SWIGGY_REST_API_PATH = `data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants`;
