import { useNavigate } from "react-router-dom";
import { BrandCardPropsType } from "../../types/BrandCardProps.types";
import axios from "axios";
import './BrandCard.css';

export function BrandCard({givenBrand, removeMethod}: BrandCardPropsType) {

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editBrand/' + givenBrand.getId());
    };
    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        axios.delete(`http://localhost:5000/api/brands/${givenBrand.getId()}`)
            .then(() => {
                removeMethod(givenBrand.getId());
            })
            .catch(error => {
                console.error('Error deleting brand:', error);
            });
    };
    return (
        <div className='card' 
        data-testid='brand-card' 
        onClick={handleCardOnClick}
        >
            <button className='remove-button' 
            data-testid='remove-button' 
            onClick={handleRemoveClick}>
                X
            </button>
            <div className='card-info' 
            data-testid='card-info'>
                <div className='brand-info'>
                    <div className='brand-id'>ID: {givenBrand.getId()}</div>
                    <div className='name'>{givenBrand.getName()}</div>
                </div>
            </div>
        </div>
    );
}