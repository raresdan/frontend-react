import {Footer} from '../footer/Footer';
import {Header} from '../header/Header';

export function Layout({children}: any) {
    return (
        <div className='layout'>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
