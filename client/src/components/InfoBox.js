import React, { useState } from 'react';

export function InfoBox({ data, scope, onDistrictChange }) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleCheckboxChange = (districtName) => {
    setSelectedDistrict((prevSelected) =>
      prevSelected === districtName ? null : districtName
    );
    console.log(districtName)
    // onDistrictChange(districtName); ... zavolání callbacku s aktualizovanou hodnotou
  };

  let infoBox;
  if (data != null) {
    const districtCheckboxes = Array.isArray(scope.districts)
      ? scope.districts.map((district, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`districtCheckbox${index}`}
              value={district.name}
              checked={selectedDistrict === district.name}
              onChange={() => handleCheckboxChange(district.name)}
            />
            <label htmlFor={`districtCheckbox${index}`}>{district.name}</label>
          </div>
        ))
      : [];

    infoBox = (
      <div>
        <h4>{data.NAZ_CZNUTS3}</h4>
        <b>{scope.name}:</b>
        <br /><br />
        <div className="checkbox-grid">{districtCheckboxes}</div>
      </div>
    );

    console.log(data.NAZ_CZNUTS3);
    console.log(selectedDistrict);

  }

  return (
    <div className="infoBox">
      {infoBox}
    </div>
  );
}
