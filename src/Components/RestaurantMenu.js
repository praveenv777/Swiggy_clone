import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL,
swiggy_menu_api_URL,
ITEM_IMG_CDN_URL} from "./constant.js";
import { RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY } from "./constant.js";
import {MenuShimmer} from "./Shimmer";

const RestaurantMenu =()=>{
    const [restaurant, setRestaurant] = useState({});
    const [menuItems, setMenuItems] = useState([]);
    //how to read a dynamic url params
    const {id} = useParams();
    // const {id} = params;
    //console.log(params)
    useEffect(()=>{
        getRestaurantinfo();
    },[]);

    async function getRestaurantinfo(){
        try {
          const response = await fetch(swiggy_menu_api_URL +id);
          const json = await response.json();
    
        console.log(json)
          // Set restaurant data
          const restaurantData = json?.data?.cards?.map(x => x.card)?.
                                 find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
          setRestaurant(restaurantData);
          

          // Set menu item data
          const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                                groupedCard?.cardGroupMap?.REGULAR?.
                                cards?.map(x => x.card?.card)?.
                                filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                                map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
           
          
          
          // Remove duplicate menu items
          const uniqueMenuItems = [];
          menuItemsData.forEach((item) => {
            if (!uniqueMenuItems.find(x => x.id === item.id)) {
              uniqueMenuItems.push(item);
            }
          })
          setMenuItems(uniqueMenuItems);
        } catch (error) {
          setMenuItems([]);
          setRestaurant(null);
          console.log(error);
        }
      }
      return (!restaurant)?<MenuShimmer/> : (
        <div className="restaurant-menu">
          <div className="restaurant-summary">
            <img
              className="restaurant-img"
              src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
              alt={restaurant?.name}
            />
            <div className="restaurant-summary-details">
              <h2 className="restaurant-title">{restaurant?.name}</h2>
              <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
              <div className="restaurant-details">
                <div
                  className="restaurant-rating"
                  style={
                    restaurant?.avgRating < 4
                      ? { backgroundColor: "var(--light-red)" }
                      : restaurant?.avgRating === "--"
                      ? { backgroundColor: "white", color: "black" }
                      : { color: "white" }
                  }
                >
                  <i className="fa-solid fa-star"></i>
                  <span>{restaurant?.avgRating}</span>
                </div>
                <div className="restaurant-rating-slash">|</div>
                <div>{restaurant?.sla?.slaString}</div>
                <div className="restaurant-rating-slash">|</div>
                <div>{restaurant?.costForTwoMessage}</div>
              </div>
            </div>
          </div>
    
          <div className="restaurant-menu-content">
            <div className="menu-items-container">
              <div className="menu-title-wrap">
                <h3 className="menu-title">Recommended</h3>
                <p className="menu-count">{menuItems.length} ITEMS</p>
              </div>
              <div className="menu-items-list">
                {menuItems.map((item) => (
                  <div className="menu-item" key={item?.id}>
                    <div className="menu-item-details">
                      <h3 className="item-title">{item?.name}</h3>
                      <p className="item-cost">
                        {item?.price > 0
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(item?.price / 100)
                          : " "}
                      </p>
                      <p className="item-desc">{item?.description}</p>
                    </div>
                    <div className="menu-img-wrapper">
                      {item?.imageId && (
                        <img
                          className="menu-item-img"
                          src={ITEM_IMG_CDN_URL + item?.imageId}
                          alt={item?.name}
                        />
                      )}
                      <button className="add-btn"> ADD +</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
}

export default RestaurantMenu;

/**
 // Question 1:-
const restaurantData = json?.data?.cards?.map(x => x.card)?.
                                 find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;

This code snippet is written in JavaScript and involves several operations using the optional chaining operator (?.) and the array methods map() and find(). Let's break it down step by step:
// STEPS OF EXPLANATION OF CODE SNIPPET

STEP-1:json?.data?.cards?.map(x => x.card)

This line attempts to access the data property of the json object. If the json object is null or undefined, the expression will return null immediately.
If the data property exists, it attempts to access the cards property. Again, if cards is null or undefined, the expression will return null.
Assuming cards is an array, it then applies the map() function to iterate over each element of the array, represented by x, and access the card property of each element.
If any of the intermediate properties (json, data, cards) are null or undefined, the entire expression will evaluate to null.
If all properties exist, the map() function will return a new array with the values of x.card.

STEP-2: .find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)

This line takes the array obtained from the previous step and applies the find() function to search for an element that satisfies the provided condition.
The condition checks if x exists and if its card property has a specific value for the @type key (RESTAURANT_TYPE_KEY).
If a matching element is found, it will be returned; otherwise, undefined will be returned.
?.card?.info || null

If the previous find() operation returns undefined, the expression ?.card?.info will evaluate to undefined immediately.
Assuming the previous step returns a valid element, it attempts to access the card property and then the info property of that element.
If any of these properties are null or undefined, the entire expression will evaluate to null.
If both properties exist, the expression will return the value of card.info.
Finally, the variable restaurantData will hold either the value obtained from the previous expression or null if any of the properties were null or undefined.

Please note that this code assumes the presence of a constant RESTAURANT_TYPE_KEY containing the desired value for the @type key.


// Question 2:-
why the value x is passed inside this code

1. The value x is passed as a parameter to the arrow function (x => x.card) within the map() function.
2. In this context, x represents each element of the cards array that is being iterated over.
3. The purpose of (x => x.card) is to extract the card property from each element of the array. 
4. The result of the map() function is a new array containing the values of x.card for each element in the original cards array.
5. By passing x as a parameter to the arrow function, it allows you to access and manipulate each element of the array within the function body.
 In this case, x.card is being accessed to extract the desired information.



EXPLANATION OF CODE SNIPPET MENUITEMSDATA, MENU_ITEM_TYPE_KEY
// Question 3:- 
 const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                                groupedCard?.cardGroupMap?.REGULAR?.
                                cards?.map(x => x.card?.card)?.
                                filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                                map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];

written in JavaScript that involves multiple operations using the optional chaining operator (?.) and the other methods.

json?.data?.cards.find(x => x.groupedCard)

This line attempts to access the data property of the json object and then the cards property within it.
Assuming both properties exist, it applies the find() function to search for an element in the cards array that satisfies the provided condition.
The condition checks if the element has a groupedCard property.
If a matching element is found, it will be returned; otherwise, undefined will be returned.
?.groupedCard?.cardGroupMap?.REGULAR?.cards

If the previous find() operation returns undefined, the expression ?.groupedCard?.cardGroupMap?.REGULAR will evaluate to undefined immediately.
Assuming the previous step returns a valid element, it attempts to access the groupedCard, cardGroupMap, and REGULAR properties successively.
If any of these properties are null or undefined, the entire expression will evaluate to undefined.
If all properties exist, it attempts to access the cards property.
If cards is an array, it will be returned; otherwise, undefined will be returned.
.map(x => x.card?.card)

This line takes the array obtained from the previous step and applies the map() function to iterate over each element of the array, represented by x.
For each element, it attempts to access the card property and then the card property of that card object.
If any of these properties are null or undefined, the resulting value in the mapped array will be undefined.
The resulting array will contain the values of x.card.card for each element in the original array.
.filter(x => x['@type'] == MENU_ITEM_TYPE_KEY)

This line takes the array obtained from the previous step and applies the filter() function to remove elements that do not satisfy the provided condition.
The condition checks if the element has a specific value for the @type key (MENU_ITEM_TYPE_KEY).
Only the elements that match the condition will remain in the filtered array.
.map(x => x.itemCards).flat().map(x => x.card?.info)

This line involves several operations on the resulting array from the previous step.
The map() function is first applied to extract the itemCards property from each element.
The resulting array of arrays is then flattened into a single array using the flat() method.
Finally, the map() function is applied again to extract the card.info property from each element.
If any of the intermediate properties are null or undefined,
 the resulting value in the mapped array will be undefined.
|| []

If the previous steps result in an empty array ([]) due to no matching elements or
 any other intermediate property being null or undefined, the expression will be evaluated as an empty array.
Finally, the variable menuItemsData will hold either the resulting array obtained 
from the previous expression or an empty array ([]) if any of the properties were null or undefined.
 */