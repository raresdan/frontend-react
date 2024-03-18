import {useContext, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {DevicesContext} from '../../contexts/DevicesContext';
import {DeviceForm} from '../../features/CRUD/Device Form/DeviceForm';
import {Device} from '../../models/device';
import {Button} from '../../shared/components/button/Button';
import {Layout} from '../../shared/components/layout/Layout';

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    priceInput: React.RefObject<HTMLInputElement>,
    imageInput: React.RefObject<HTMLInputElement>,
): Device {
    if (
        !idInput.current ||
        !nameInput.current ||
        !priceInput.current ||
        !imageInput.current
    ) {
        throw new Error('Null references!');
    }
    if (
        !idInput.current!.value ||
        !nameInput.current!.value ||
        !priceInput.current!.value ||
        !imageInput.current!.value
    ) {
        throw new Error('All fields should be filled in!');
    }

    const deviceID = parseInt(idInput.current!.value);
    const deviceName = nameInput.current!.value;
    const devicePrice = parseInt(priceInput.current!.value);
    const deviceImage = imageInput.current!.value;

    return new Device(deviceID, deviceName, devicePrice, deviceImage);
}

export function AddDevicePage() {
    document.title = 'Add Device';

    const idInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const priceInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const deviceContext = useContext(DevicesContext)!;

    const handleOnClickWrapper = () => {
        try {
            const inputDevice = handleOnClick(
                idInput,
                nameInput,
                priceInput,
                imageInput,
            );
            deviceContext.addDevice(inputDevice);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };
    return (
        <Layout>
            <div className='main=page-container'>
                <div className='main-title'>Add Device</div>

                <DeviceForm
                    idInput={idInput}
                    nameInput={nameInput}
                    priceInput={priceInput}
                    imageInput={imageInput}
                />

                <Button
                    type='submit'
                    buttonText='Add Device'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}
