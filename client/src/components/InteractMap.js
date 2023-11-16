import React, { useState, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import { InfoBox } from './InfoBox';
import regions from '../mapdata/regions.cz.json';
import districts from '../mapdata/districts.cz.json';

const dataScopes = [
    {
        name: "",
        districts: "",
    }
];

export default function InteractMapCZ() {
    const [dataScope, setDataScope] = useState(dataScopes[0]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [clickedRegion, setClickedRegion] = useState(null);

    const highlightFeature = (e) => {
        let layer = e.target;
        if (!clickedRegion) { // zvýraznění pouze pokud není vybraný žádný kraj
            setHoveredRegion(layer.feature.properties);
        }
    };

    const resetHighlight = () => {
        if (!clickedRegion) { // resetovat pouze pokud není vybraný žádný kraj
            setHoveredRegion(null);
        }
    };

    const findDistricts = (regionId) => {
        const region = districts.find(item => item.id === regionId);
        return region.districts;
    };

    const updateDataScopes = (districts) => {
        const newDataScope = {
            name: "Vyberte okres",
            districts: districts,
        };
        setDataScope(newDataScope);
    };
    
    const onEachFeature = (feature, layer,) => {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: () => {
                const selectedDistricts = findDistricts(feature.properties.id);
                setSelectedRegion({
                    ...feature.properties,
                    districts: selectedDistricts,
                });
                updateDataScopes(selectedDistricts);
                setClickedRegion(feature.properties); // uložení kliknutého regionu
                console.log('Kliknuto na kraj:', feature.properties.NAZ_CZNUTS3);
                console.log('ID kraje:', feature.properties.id);
                console.log('Okresy kraje:', selectedDistricts);
            }
        });
    };

    const style = (feature) => {
        let mapStyle = {
            weight: 1,
            opacity: 1,
            color: '#000',
            fillColor: 'transparent',
        };

        if ((hoveredRegion && feature.properties.id === hoveredRegion.id) || (clickedRegion && feature.properties.id === clickedRegion.id)) {
            mapStyle.color = '#000';
            mapStyle.fillColor = '#1975F0';
        }

        return mapStyle;
    };

    useEffect(() => {
        const savedSelectedRegion = localStorage.getItem('selectedRegion');
        if (savedSelectedRegion) {
            setSelectedRegion(JSON.parse(savedSelectedRegion));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedRegion', JSON.stringify(selectedRegion));
    }, [selectedRegion]);

    useEffect(() => {
        const savedClickedRegion = localStorage.getItem('clickedRegion');
        if (savedClickedRegion) {
            setClickedRegion(JSON.parse(savedClickedRegion));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('clickedRegion', JSON.stringify(clickedRegion));
    }, [clickedRegion]);

    console.log(clickedRegion && clickedRegion.NAZ_CZNUTS3);

    return (
        <div>
            <div className='mapContainer' style={{ height: '500px' }}>
                <MapContainer center={[49.8175, 15.472962]} zoom={7} dragging={false} scrollWheelZoom={false} zoomControl={false}>
                    <GeoJSON data={regions} style={style} onEachFeature={onEachFeature} />
                </MapContainer>
            </div>
            <div>
                <InfoBox data={selectedRegion} scope={dataScope} />
            </div>
        </div>
    );
}

// {clickedRegion && <UserDetails dataNAZ={clickedRegion.NAZ_CZNUTS3} />}