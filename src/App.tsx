import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DevicesContextProvider} from './contexts/DevicesContext';
import {Device} from './models/device';
import './App.css';
import {AddDevicePage} from './pages/Add Device Page/AddDevicePage';
import {ChartPage} from './pages/Chart Page/ChartPage';
import {EditDevicePage} from './pages/Edit Device Page/EditDevicePage';
import axios from 'axios';
import { io } from 'socket.io-client';
import Alert from '@mui/material/Alert';
import { Brand } from './models/brand';
import { BrandContextProvider} from './contexts/BrandsContext';
import { DisplayDevicesPage } from './pages/Display Devices Page/DisplayDevicesPage';
import { DisplayBrandsPage } from './pages/Display Brands Page/DisplayBrandsPage';
import { AddBrandPage } from './pages/Add Brand Page/AddBrandPage';
import { EditBrandPage } from './pages/Edit Brand Page/EditBrandPage';

function App() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isServerOnline, setIsServerOnline] = useState(true);

    useEffect(() => {
        const socket = io('http://localhost:5000', { transports : ['websocket'] });
        socket.on('newDevice', (newDevice: any) => {
          console.log('Received new device from server:', newDevice);
          const device = new Device(newDevice.id, newDevice.name, newDevice.price, newDevice.brand, newDevice.image);
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
                const devices = response.data.map((device: any) => new Device(device.id, device.name, device.price, device.brand, device.image));
                setDevices(devices);
            })
            .catch(error => {
                console.error('Error fetching devices:', error);
                setIsServerOnline(false);
            });
    }

    const fetchBrands = () => {
        axios.get('http://localhost:5000/api/brands')
            .then(response => {
                console.log('Brands:', response.data);
                const brands = response.data.map((brand: any) => new Brand(brand.brand_id, brand.name));
                setBrands(brands);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
                setIsServerOnline(false);
            });
    }

    useEffect(() => {
        fetchDevices();
        fetchBrands();
    }, []);

    console.log('Devices:', devices);
    console.log('Brands:', brands);
    
    const addDevice = (newDevice: Device) => {
        setDevices(prevState => [...prevState, newDevice]);
    };

    const removeDevice = (deviceId: number) => {
        setDevices((prevState: Device[]) =>
            prevState.filter((device) => device.getId() != deviceId),
        );
    };

    const addBrand = (newBrand: Brand) => {
        setBrands(prevState => [...prevState, newBrand]);
    }

    const removeBrand = (brandId: number) => {
        setBrands((prevState: Brand[]) =>
            prevState.filter((brand) => brand.getId() != brandId),
        );
    }

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
            <BrandContextProvider brandContext={{ brands, addBrand, removeBrand }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<DisplayDevicesPage />} />
                        <Route path='/addDevice' element={<AddDevicePage />} />
                        <Route path='/editDevice/:deviceId'element={<EditDevicePage />}/>

                        <Route path='/brands' element={<DisplayBrandsPage/>} />
                        <Route path='/addBrand' element={<AddBrandPage />} />
                        <Route path='/editBrand/:brandId' element={<EditBrandPage />} />

                        <Route path='/statistics' element={<ChartPage />} />
                    </Routes>
                </BrowserRouter>
            </BrandContextProvider>
        </DevicesContextProvider>
    );
}

export default App;
