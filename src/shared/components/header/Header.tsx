import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <nav className='navbar'>
                <div className='title'>Medevices</div>

                <div className='menu'>
                    <div>
                        <Link to='/' className='link'>
                            Show Devices
                        </Link>
                    </div>

                    <div>
                        <Link to='/addDevice' className='link'>
                            Add Device
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export {Header};
