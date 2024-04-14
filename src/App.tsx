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
import { io } from 'socket.io-client';
import Alert from '@mui/material/Alert';

function App() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isServerOnline, setIsServerOnline] = useState(true);

    useEffect(() => {
        const socket = io('http://localhost:5000', { transports : ['websocket'] });
        socket.on('newDevice', (newDevice: any) => {
          console.log('Received new device from server:', newDevice);
          const device = new Device(newDevice.id, newDevice.name, newDevice.price, newDevice.image);
          setDevices((prevDevices) => [...prevDevices, device]);
        });

      }, []);
    
      useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));
    
        return () => {
          window.removeEventListener('online', () => setIsOnline(true));
          window.removeEventListener('offline', () => setIsOnline(false));
        };
      }, []);

    const fetchDevices = () => {
        axios.get('http://localhost:5000/api/devices')
            .then(response => {
                const devices = response.data.map((device: any) => new Device(device.id, device.name, device.price, device.image));
                setDevices(devices);
            })
            .catch(error => {
                console.error('Error fetching devices:', error);
                setIsServerOnline(false);
            });
    }
    useEffect(() => {
        fetchDevices();
        console.log(devices);
    }, []);
    
    const addDevice = (newDevice: Device) => {
        setDevices(prevState => [...prevState, newDevice]);
    };

    const removeDevice = (deviceId: number) => {
        setDevices((prevState: Device[]) =>
            prevState.filter((device) => device.getId() != deviceId),
        );
    };

    if (!isOnline) {
        return <Alert severity="warning">You are currently offline. Please check your internet connection.</Alert>;
      }
    
    if (!isServerOnline) {
        return <Alert severity="warning">The server is currently down. Please try again later.</Alert>;
      }

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
