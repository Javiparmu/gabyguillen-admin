import { baseUrl } from '@/utils/constants';
import type { Painting } from '../../types';
import AdminDashboard from '../components/admin-dashboard';

const DashboardPage = async () => {
    const data = await fetch(baseUrl + '/api/paintings', {
        method: 'GET',
    })

    const paintings: Painting[] = await data.json();

    return (
        <main className="flex flex-col items-center overflow-x-auto md:overflow-visible">
            <AdminDashboard paintings={paintings} />
        </main>
    );
};

export default DashboardPage;
