import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DevicesContextProvider} from './contexts/DevicesContext';
import {Device} from './models/device';
import {DisplayDevicesPage} from './pages/Display Data Page/DisplayDevicesPage';

let testDevice1: Device = new Device(1, 'X-Ray', 100, 'xray.jpg');
let testDevice2: Device = new Device(2, 'Stethoscope', 20, 'stethoscope.jpg');

import './App.css';
import {AddDevicePage} from './pages/Add Device Page/AddDevicePage';
import {EditDevicePage} from './pages/Edit Device Page/EditDevicePage';

function App() {
    let [devices, setDevices] = useState<Device[]>([testDevice1, testDevice2]);

    const addDevice = (newDevice: Device) => {
        setDevices((prevState: Device[]) => [...prevState, newDevice]);
    };

    const removeDevice = (deviceId: number) => {
        setDevices((prevState: Device[]) =>
            prevState.filter((device) => device.getId() != deviceId),
        );
    };

    useEffect(() => {
        console.log(devices);
    });
    return (
        <DevicesContextProvider
            deviceContext={{devices, addDevice, removeDevice}}
        >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DisplayDevicesPage />} />
                    <Route path='/addDevice' element={<AddDevicePage />} />
                    <Route
                        path='/editDevice/:deviceId'
                        element={<EditDevicePage />}
                    />
                </Routes>
            </BrowserRouter>
        </DevicesContextProvider>
    );
}

export default App;
