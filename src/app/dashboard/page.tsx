import { baseUrl } from '@/utils/constants';
import type { Painting } from '../../types';
import AdminDashboard from '../components/admin-dashboard';

const fetchPaintings = async () => {
    const data = await fetch(baseUrl + '/api/paintings', {
        method: 'GET',
        cache: 'no-cache',
        next: {
            tags: ['paintings'],
        }
    })

    const paintings: Painting[] = await data.json();

    return paintings;
}

const DashboardPage = async () => {
    const paintings: Painting[] = await fetchPaintings() 

    return (
        <main className="flex flex-col items-center overflow-x-auto md:overflow-visible">
            <AdminDashboard paintings={paintings} />
        </main>
    );
};

export default DashboardPage;
