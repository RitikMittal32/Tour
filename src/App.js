import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import './App.css';
import SiteSelection from './component/SiteSelection';
import InteractiveMap from './component/InteractiveMap';
import VirtualTour from './component/VirtualTour';
import AddHistorical from './component/AddHistorical';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Private from './component/Private';
import Nav from './component/Nav';
import Home from './component/Home';


function App() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [siteData, setSiteData] = useState([]);

  const getData= async ()=>{
    let result = await fetch('http://localhost:5000/api/sites')
    result = await result.json();
    if(result){
      setSiteData(result);
    }
}

  useEffect(() => {
    
    getData();
    axios
      .get('/api/sites')
      .then((response) => {
        setSiteData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSiteSelection = (site) => {
    setSelectedSite(site);
    
  };

  return (
      <div className="App-container">
        <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/site" element={<SiteSelection  onSelectSite={handleSiteSelection}/>} />
          <Route path="/map" element={<InteractiveMap   sites={siteData}
              selectedSite={handleSiteSelection}/>} />
          <Route path="/tour" element={selectedSite ? ( <div><VirtualTour  site={selectedSite} /></div> ) :  (<div><b>Please Select site from the Site Selection</b></div>)}  />
          <Route path='/add' element={<AddHistorical />} />
          <Route element={<Private />}>
            <Route path='/logout' element={<h1>Ok</h1>}/>
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
