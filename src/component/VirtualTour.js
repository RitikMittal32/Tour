
import { useEffect, useState } from "react";
import Image from "./Image";
import useAxios from "./useAxios";
import Skeleton from "./Skeleton";

const VirtualTour = ({ site }) => {

  const{response, isLoading, error, fetchData} = useAxios(`search/photos?page=1&query=${site.name}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
 

  return (
    <div>
      <h2>Tour Image of {site.name}</h2>
      <p>{site.description}</p>
      <div className="image">
        {isLoading ? <Skeleton  item={10}/> : response.map((data, key) => <Image key={key} data={data} />)}
      </div>
    </div>
  );
};

export default VirtualTour;
