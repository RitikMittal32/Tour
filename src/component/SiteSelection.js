import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';

const SiteSelection = ({ onSelectSite }) => {
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();
const[check,setCheck] = useState(false);

useEffect(()=>{
          getProduct();
},[])

const getProduct= async ()=>{
      let result = await fetch(`${BASE_URL}/products`)
      result = await result.json();
      
      if(result){
        setSites(result);
        setCheck(true);
      }
}



const deleteProduct = async (id) => {
  let result = await fetch(`${BASE_URL}/product/${id}`,{
    method: 'Delete'
  });
  if(result){
    getProduct();
  }else{
     console.log('Product Detection Failed');
  }
};

const handleSelectSite = (item) => {
   onSelectSite(item);
    navigate('/tour');
}



  return (
    <div className='product-list'>
    <h2>Select a Historical Site</h2>
    <div className='product-data'>
    {check && sites.length > 0 ? (
      <table className='site-table'>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>
                <button className="delete button" onClick={() => deleteProduct(item._id)}>
                  Delete
                </button>
                <button className="site button" onClick={() => handleSelectSite(item)}>
                  {item.name}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className='empty'>
        <h1>There is no list available</h1>
      </div>
    )}
    </div>
  </div>
  );
};

export default SiteSelection;
