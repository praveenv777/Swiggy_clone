import { IMG_CDN_URL } from './constant';
const RestuarantCard = ({name, 
    cuisines,
    areaName,
    cloudinaryImageId,
    avgRatingString,
    sla,
    costForTwo,
    }) =>{
  
    return (
        <div className='restuarant-card'>
          <img src={IMG_CDN_URL+cloudinaryImageId} alt='Card-image'/>
          <h3>{name}</h3>
          <h5>{cuisines.join(", ")}</h5>
          <h5>{areaName}</h5>
          <span>
          <h4>{avgRatingString}</h4>
          <h4>.</h4>
          <h4>{sla?.lastMileTravelString ?? '2.0 km'}</h4>
          <h4>•</h4>
          <h4>{costForTwo ?? '₹200 for two'}</h4>
          </span>
        </div>
  
    )
  }

 export default RestuarantCard; 