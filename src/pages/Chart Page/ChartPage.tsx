import { PieChart } from '@mui/x-charts/PieChart';
import { useContext } from 'react';
import { DevicesContext } from '../../contexts/DevicesContext';
import { Device } from '../../models/device';

export function ChartPage() {
    const devicesContext = useContext(DevicesContext)!;
    let allDevices: Device[] = devicesContext.devices;

    // Create a map to aggregate prices by device name
    const devicePriceMap = new Map();
    allDevices.forEach(device => {
        const name = device.getName();
        const price = device.getPrice();
        if (devicePriceMap.has(name)) {
            devicePriceMap.set(name, devicePriceMap.get(name) + price);
        } else {
            devicePriceMap.set(name, price);
        }
    });

    // Calculate total price
    const totalPrice = Array.from(devicePriceMap.values()).reduce((total, price) => total + price, 0);

    // Generate pie chart data
    const pieChartData = Array.from(devicePriceMap.entries()).map(([name, price], index) => ({
        id: index,
        value: (price / totalPrice) * 100,
        label: name,
    }));

    return (
        <PieChart series={[{ data: pieChartData }]} width={800} height={500} />
    );
}
