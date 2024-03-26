import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DevicesContextProvider} from './contexts/DevicesContext';
import {Device} from './models/device';
import {DisplayDevicesPage} from './pages/Display Data Page/DisplayDevicesPage';

let testDevice1: Device = new Device(1, 'X-Ray', 100, 'xray.jpg');
let testDevice2: Device = new Device(2, 'Stethoscope', 20, 'stethoscope.jpg');
let testDevice3: Device = new Device(3, 'Syringe', 5, 'syringe.jpg');
let testDevice4: Device = new Device(4, 'X-Ray', 100, 'xray.jpg');
let testDevice5: Device = new Device(5, 'Syringe', 7, 'syringe.jpg');
let testDevice6: Device = new Device(6, 'Stethoscope', 25, 'stethoscope.jpg');
let testDevice7: Device = new Device(7, 'X-Ray', 100, 'xray.jpg');
let testDevice8: Device = new Device(8, 'X-Ray', 100, 'xray.jpg');

import './App.css';
import {AddDevicePage} from './pages/Add Device Page/AddDevicePage';
import {ChartPage} from './pages/Chart Page/ChartPage';
import {EditDevicePage} from './pages/Edit Device Page/EditDevicePage';

function App() {
    let [devices, setDevices] = useState<Device[]>([
        testDevice1,
        testDevice2,
        testDevice3,
        testDevice4,
        testDevice5,
        testDevice6,
        testDevice7,
        testDevice8,
    ]);

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
                    <Route path='/statistics' element={<ChartPage />} />
                </Routes>
            </BrowserRouter>
        </DevicesContextProvider>
    );
}

export default App;
