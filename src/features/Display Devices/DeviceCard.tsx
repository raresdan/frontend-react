import {useNavigate} from 'react-router-dom';
import {DeviceCardPropsType} from '../../types/DeviceCardProps.types';

import './DeviceCard.css';
import axios from 'axios';
import React from 'react';
import { ServerStatusContext } from '../../App';

export function DeviceCard({givenDevice, removeMethod}: DeviceCardPropsType) {
    // let path: string = 'assets/' + givenDevice.getImage();
    const isServerOnline = React.useContext(ServerStatusContext);
    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editDevice/' + givenDevice.getId());
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isServerOnline) {
            axios.delete(`http://localhost:5000/api/devices/${givenDevice.getId()}`)
                .then(() => {
                    removeMethod(givenDevice.getId());
                })
                .catch(error => {
                    console.error('Error deleting device:', error);
                });
        } else {
            removeMethod(givenDevice.getId());

            const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
            pendingApiCalls.push({
                method: 'DELETE',
                url: `http://localhost:5000/api/devices/${givenDevice.getId()}`,
            });
            localStorage.setItem('pendingApiCalls', JSON.stringify(pendingApiCalls));
        }
    };
    
    return (
        <div
            className='card'
            data-testid='device-card'
            onClick={handleCardOnClick}
        >
            <button
                className='remove-button'
                data-testid='remove-button'
                onClick={handleRemoveClick}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    
                    <img src={givenDevice.getImage()} alt='device image' />
                </div>

                <div className='device-info'>
                    <div className='device-id'>ID: {givenDevice.getId()}</div>
                    <div className='name'>{givenDevice.getName()}</div>
                    <div className='brand'>Brand: {givenDevice.getBrand()}</div>
                    <div className='price'>Price: {givenDevice.getPrice()}</div>
                </div>
            </div>
        </div>
    );
}
