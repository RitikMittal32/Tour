import React, { useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const InteractiveMap = ({ sites, selectedSite }) => {
  const mapRef = useRef();
  
  const ZoomInButton = () => {
    const map = useMap();
    return (
      <button
        className="zoom-button-positive"
        onClick={() => {
            map.setZoom(map.getZoom() + 1);
  
        }}
      >
        Zoom In
      </button>
    );
  };

  const ZoomOutButton = () => {
    const map = useMap();
    return (
      <button
        className="zoom-button-negative"
        onClick={() => {
            map.setZoom(map.getZoom() - 1);
        }}
      >
        Zoom Out
      </button>
    );
  };

  return (
    <div>
      <div className='mapguide'>
        <h1>Welcome to Interactive Map</h1>
      </div>
      <div className='map'>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={5}
        style={{ height: '800px', width: '1400px' }}
        dragging={false}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomInButton />
        <ZoomOutButton />
        {sites.map((site) => (
          <Marker
            key={site._id}
            position={[site.latitude, site.longitude]}
            onClick={() => selectedSite(site)}
          >
            <Popup>{site.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
