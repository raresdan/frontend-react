import {useContext} from 'react';
import {DevicesContext} from '../../contexts/DevicesContext';
import {DeviceCard} from '../../features/Display Devices/DeviceCard';
import {Device} from '../../models/device';
import {Layout} from '../../shared/components/layout/Layout';

export function DisplayDevicesPage() {
    document.title = 'Display Devices';
    const devicesContext = useContext(DevicesContext)!;
    let allDevices: Device[] = devicesContext.devices;
    const removeMethod = devicesContext.removeDevice;

    return (
        <Layout>
            <div className='main-page-container'>
                <div className='all-devices' data-testid='devices-list'>
                    {allDevices.map((device) => (
                        <DeviceCard
                            givenDevice={device}
                            removeMethod={removeMethod}
                            key={device.getId()}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
