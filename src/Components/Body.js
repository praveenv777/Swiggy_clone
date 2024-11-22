import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react"; /* This is named export */
import Shimmer from "./Shimmer"; /* This is default export */
import { swiggy_api_url } from "./constant";
import {Link} from "react-router-dom";

// Filter the restaurant data according input type
function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}

// Body Component for body section: It contain all restaurant cards
const Body = () => {
  // useState: To create a state variable, searchText, allRestaurants and filteredRestaurants is local state variable
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    getRestaurants();
  }, []);

  // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const data = await fetch(swiggy_api_url);
      const json = await data.json();
     

      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          // initialize checkData for Swiggy Restaurant data
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      // updated state variable restaurants with Swiggy API data
      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const data = filterData(searchText, restaurants); // calling the  filterData function
      setFilteredRestaurants(data);
      setErrorMessage("");
      if (data.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  // if allRestaurants is empty don't render restaurants cards
  if (!allRestaurants) return null;

  return (
    <>
      <div className="Search-container">
        <input
          type="text"
          className="search-text"
          placeholder="Search a restaurant you want..."
          value={searchText}
          // update the state variable searchText when we typing in input box
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="Restaurant-list">
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                  to={"/restaurant/" + restaurant.info?.id}
                  key={restaurant.info?.id}
                >
                  {/* if we click on any restaurant card it will redirect to that restaurant menu page */}
                  <RestaurantCard {...restaurant.info} />
                </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Body;



/**
 Client-side routing refers to the ability to handle navigation and rendering of different components
  or views within a web application on the client-side, without requiring a full page refresh 
  or a server request. In client-side routing, the routing logic is handled by the JavaScript code running on the client's browser.

In React, client-side routing is typically achieved using libraries such as React Router.
It allows you to define routes within your application and map them to specific components.
When a user interacts with the application and navigates to a different route, 
only the necessary components are rendered and updated, providing a smooth and 
responsive user experience.

why client-side routing is commonly used in React applications:

Improved Performance: With client-side routing, only the necessary components are loaded and updated when navigating between routes. 
This avoids full page reloads, resulting in faster transitions and a more seamless user experience.

Single-Page Application (SPA) Behavior: Client-side routing enables the development of 
single-page applications, where the entire application is loaded initially, and subsequent
interactions are handled within the same page. 
This allows for a more fluid and desktop-like experience for users.

Modular and Maintainable Code: Client-side routing allows you to organize your codebase into 
separate components, each responsible for a specific route or view. 
This promotes code reusability, modularity, and easier maintenance of your application.

Deeper Linking and Bookmarking: Client-side routing enables the use of meaningful and 
descriptive URLs for different routes. Users can directly access specific views or 
components by entering the corresponding URL or bookmarking it. 
This enhances the user experience and makes the application more shareable.

Enhanced User Interface: Client-side routing allows you to create dynamic and interactive user 
interfaces. You can conditionally render components based on route parameters or application state,
 enabling complex UI behavior and transitions.

Overall, client-side routing in React provides a flexible and efficient way to handle navigation 
within your application, resulting in improved performance, maintainability, and a better 
user experience.







 */