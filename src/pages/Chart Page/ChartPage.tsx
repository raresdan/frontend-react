import {PieChart} from '@mui/x-charts/PieChart';
import {useContext} from 'react';
import {DevicesContext} from '../../contexts/DevicesContext';
import {Device} from '../../models/device';

export function ChartPage() {
    const devicesContext = useContext(DevicesContext)!;
    let allDevices: Device[] = devicesContext.devices;

    const totalPrice = allDevices.reduce(
        (total, device) => total + device.getPrice(),
        0,
    );
    const pieChartData = allDevices.map((device, index) => ({
        id: index,
        value: (device.getPrice() / totalPrice) * 100,
        label: device.getName(),
    }));

    return (
        <PieChart series={[{data: pieChartData}]} width={400} height={200} />
    );
}
