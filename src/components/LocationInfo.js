import React from "react";
import "./locationinfo.css";

const LocationInfo = ({ location }) => {
  if (!location || !location.places || location.places.length === 0) {
    return null;
  }

  return (
    <div className="location-info">
      <h3>Location Information</h3>
      <p>
        <strong>Country:</strong> {location.country}
      </p>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Place Name</th>
          </tr>
        </thead>
        <tbody>
          {location.places.map((place, index) => (
            <tr key={index}>
              <td>{place.state}</td>
              <td>{place["place name"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationInfo;
