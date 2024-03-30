import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DevicesContextProvider} from './contexts/DevicesContext';
import {Device} from './models/device';
import {DisplayDevicesPage} from './pages/Display Data Page/DisplayDevicesPage';


import './App.css';
import {AddDevicePage} from './pages/Add Device Page/AddDevicePage';
import {ChartPage} from './pages/Chart Page/ChartPage';
import {EditDevicePage} from './pages/Edit Device Page/EditDevicePage';
import axios from 'axios';

function App() {
    const [devices, setDevices] = useState<Device[]>([]);

    const fetchDevices = () => {
        axios.get('http://localhost:5000/api/devices')
            .then(response => {
                const devices = response.data.map((device: any) => new Device(device.id, device.name, device.price, device.image));
                setDevices(devices);
            })
            .catch(error => {
                console.error('Error fetching devices:', error);
            });
    }
    useEffect(() => {
        fetchDevices();
    }, []);
    
    const addDevice = (newDevice: Device) => {
        setDevices(prevState => [...prevState, newDevice]);
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
            deviceContext={{ devices, addDevice, removeDevice }}
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
