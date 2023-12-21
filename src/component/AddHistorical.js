import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';

const AddHistorical = () => {
          const [name,setName] = useState("");
          const[description,setDescription] = useState('');
          const[latitude, setLatitude] = useState('');
          const[longitude, setLongitude] = useState('');
          const navigate = useNavigate();
          const[error,setError] = useState(false);

          const addProduct = async () => {

                    if(!name || !description || !latitude || !longitude){
                              setError(true)
                              return false;
                    }

                    const userId = JSON.parse(localStorage.getItem('user'))._id;
                    let result = await fetch(`${BASE_URL}/add-product`,{
                              method:'post',
                              body:JSON.stringify({name,description,latitude,longitude,userId}),
                              headers:{
                                        'Content-Type':'application/json'
                              }
                   
                    })

                    if(result){
                              alert("update the datasheet successfully");
                              navigate('/site');
                    }
                    result = await result.json();
          }

  return (
    <div className='product'>
          <h1>Add Historical</h1>
          <input type='text' placeholder='Enter Name' value={name} className='inputBox' onChange={(e)=>setName(e.target.value)}/>
          {error && !name && <span className='invalid-input'>Enter valid name</span>}
          <input type='text' placeholder='Enter Description' value={description} className='inputBox'  onChange={(e)=>setDescription(e.target.value)} />
          {error && !description && <span className='invalid-input'>Enter Description name</span>}

          <input type='text' placeholder='Enter Latitude' value={latitude} className='inputBox' onChange={(e)=>setLatitude(e.target.value)}/>
          {error && !latitude && <span className='invalid-input'>Enter Latitude name</span>}

          <input type='text' placeholder='Enter Longitude' value={longitude} className='inputBox' onChange={(e)=>setLongitude(e.target.value)}/>
          {error && !longitude && <span className='invalid-input'>Enter Longitude name</span>}

          <button className='registerButton' onClick={addProduct}>Add Historical</button>
    </div>
  )
}

export default AddHistorical