import {useNavigate} from 'react-router-dom';
import {DeviceCardPropsType} from '../../types/DeviceCardProps.types';

import './DeviceCard.css';

export function DeviceCard({givenDevice, removeMethod}: DeviceCardPropsType) {
    let path: string = 'assets/' + givenDevice.getImage();

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editDevice/' + givenDevice.getId());
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
                onClick={(e) => {
                    e.stopPropagation();
                    removeMethod(givenDevice.getId());
                }}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    <img src={path} alt='device image' />
                </div>

                <div className='device-info'>
                    <div className='device-id'>ID: {givenDevice.getId()}</div>
                    <div className='name'>{givenDevice.getName()}</div>
                    <div className='price'>Price: {givenDevice.getPrice()}</div>
                </div>
            </div>
        </div>
    );
}
