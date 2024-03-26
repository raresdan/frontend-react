import {useContext, useEffect, useState} from 'react';
import {DevicesContext} from '../../contexts/DevicesContext';
import {DeviceCard} from '../../features/Display Devices/DeviceCard';
import {Device} from '../../models/device';
import {Button} from '../../shared/components/button/Button';
import {Layout} from '../../shared/components/layout/Layout';

import './DisplayDevicesPage.css';

export function DisplayDevicesPage() {
    document.title = 'Display Devices';

    let [isAscending, setIsAscending] = useState<boolean>(true);

    const devicesContext = useContext(DevicesContext)!;
    let allDevices: Device[] = devicesContext.devices;
    const removeMethod = devicesContext.removeDevice;

    useEffect(() => {
        allDevices.sort((firstDevice, secondDevice) => {
            return firstDevice.getPrice() - secondDevice.getPrice();
        });
        if (!isAscending) allDevices.reverse();
    }, [isAscending]);

    const [visibleCount, setVisibleCount] = useState<number>(4);

    return (
        <Layout>
            <div className='main-page-container'>
                <Button
                    onClick={() => setIsAscending(!isAscending)}
                    buttonText={`Sort ${isAscending ? 'ascending' : 'descending'} by price`}
                    type='button'
                />

                <div className='all-devices' data-testid='devices-list'>
                    {allDevices.slice(0, visibleCount).map((device) => (
                        <DeviceCard
                            givenDevice={device}
                            removeMethod={removeMethod}
                            key={device.getId()}
                        />
                    ))}
                </div>
                {visibleCount < allDevices.length && (
                    <>
                        <Button
                            onClick={() => setVisibleCount(visibleCount + 4)}
                            buttonText='Show More'
                            type='button'
                        />
                        <p>
                            Showing {visibleCount} out of {allDevices.length}{' '}
                            devices
                        </p>
                    </>
                )}
            </div>
        </Layout>
    );
}
