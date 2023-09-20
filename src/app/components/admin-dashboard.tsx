'use client';

import { Fragment, useEffect, useState } from 'react';
import type { Painting } from '../../types';
import UpdateModal from '../components/update-modal';
import CreateModal from '../components/create-modal';
import { DeleteModal } from '../components/delete-modal';
import { ActionDropdown } from '../components/action-dropdown';
import { SupabaseService } from '@/libs/SupabaseService';
import Image from 'next/image';
import SearchBar from './search-bar';
import TableFooter from './table-footer';

interface AdminDashboardProps {
    paintings: Painting[];
}

const pageSize = 10;

const AdminDashboard = ({paintings}: AdminDashboardProps) => {
    const [filteredPaintings, setFilteredPaintings] = useState<Painting[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(paintings.length / pageSize));
    const [totalCount, setTotalCount] = useState(paintings.length);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPainting, setSelectedPainting] = useState<Partial<Painting>>();
    const [search, setSearch] = useState('' as string);
    const [showQr, setShowQr] = useState(false);

    useEffect(() => {
        setFilteredPaintings([...paintings].slice(0, pageSize))
    }, [paintings]);

    const onCreate = () => {
        setCreateModalOpen(true)

        const painting: Partial<Painting> = {
            title: '',
            description: '',
            collection: '',
            price: 0,
            image_url: '',
            qr: ''
        };

        setSelectedPainting(painting);
    };

    const onEdit = () => {
        setUpdateModalOpen(true);
    };

    const onDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const onDelete = () => {
        setDeleteModalOpen(false);
        
        if (selectedPainting) {
            SupabaseService.delete(String(selectedPainting.id), 'paintings');

            const index = filteredPaintings.findIndex(painting => String(painting.id) === String(selectedPainting.id));

            if (index !== -1) {
                const updatedPaintings = [...paintings];
                updatedPaintings.splice(index, 1);

                setFilteredPaintings(updatedPaintings);
            }

            setSelectedPainting(undefined);
        }
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);

        const filtered = paintings.filter(painting => painting.title?.toLowerCase().includes(e.target.value.toLowerCase()));

        setFilteredPaintings(filtered);
        setNumberOfPages(Math.ceil(filtered.length / pageSize));
        setTotalCount(filtered.length);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);

        const filtered = paintings.filter(painting => painting.title?.toLowerCase().includes(search.toLowerCase()));

        const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

        setFilteredPaintings(paginated);
    };

    const onShowQR = () => {
        setShowQr(true);
    };

    const showActions = (id: number) => {
        if (selectedPainting?.id === id) {
            setSelectedPainting(undefined);
        } else {
            const painting = paintings.find(painting => painting.id === id);

            if (painting != null) {
                setSelectedPainting(painting);
            }
        }
    };

    return (
        <main className="flex flex-col items-center overflow-x-auto md:overflow-visible">
            <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-white mt-10">Lista de cuadros</h1>
            <div className="flex flex-col items-end justify-end mt-10">
                <div className="w-full flex flex-row justify-between h-[45px]">
                    <SearchBar onChange={onSearch} />
                    <button onClick={() => onCreate()} id="submit-button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Nuevo cuadro</button>
                </div>
                <div className="relative shadow-md sm:rounded-lg mt-5 min-w-[60vw] overflow-x-auto md:overflow-x-visible">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Colección
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Precio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPaintings?.map(painting => (
                                <Fragment key={painting.slug}>
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={painting.id}>
                                        <th scope="row" className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                {painting.image_url
                                                    ? <img alt={painting.title ?? 'painting-image'} className="w-16 h-16 object-cover rounded-md" src={painting.image_url} />
                                                    : <div className="h-16 w-16 rounded-sm bg-gray-100" />
                                                }
                                            </div>
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {painting.title}
                                        </th>
                                        <td className="px-6 py-4 max-w-[20ch] truncate whitespace-nowrap">
                                            {painting.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {painting.collection}
                                        </td>
                                        <td className="px-6 py-4">
                                            {painting.price}€
                                        </td>
                                        <td className="px-6 py-4">
                                            <ActionDropdown
                                                isOpen={selectedPainting?.id === painting.id}
                                                onEdit={onEdit}
                                                onDelete={onDeleteClick}
                                                showActions={() => showActions(painting.id)}
                                                onShowQR={onShowQR}
                                            />
                                        </td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                        <TableFooter 
                            onNextPage={() => onPageChange(currentPage + 1)} 
                            onPreviousPage={() => onPageChange(currentPage - 1)} 
                            onPageSelect={(page) => onPageChange(page)} 
                            currentPage={currentPage} 
                            pageNumber={numberOfPages}
                            itemsPerPage={pageSize}
                            totalCount={totalCount}
                        />
                    </table>
                </div>
            </div>
            <button onClick={() => window.location.href = "/"} id="submit-button" className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ir a la página principal</button>
            {updateModalOpen && selectedPainting &&
                <UpdateModal painting={selectedPainting} onClose={() => setUpdateModalOpen(false)} />
            }
            {createModalOpen && selectedPainting &&
                <CreateModal painting={selectedPainting} onClose={() => setCreateModalOpen(false)} />
            }
            {deleteModalOpen && selectedPainting &&
                <DeleteModal onDelete={onDelete} onClose={() => setDeleteModalOpen(false)} />
            }
            <div style={{ display: showQr ? 'block' : 'none' }} onClick={() => setShowQr(false)} className="fixed top-0 left-0 z-40 w-screen h-screen bg-black opacity-60" />
            {selectedPainting != null && selectedPainting.qr != null && showQr &&
                <Image width={250} height={250} src={selectedPainting.qr} alt="qr" className="w-64 h-64 fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-50 rounded-md"/>
            }
        </main>
    );
};

export default AdminDashboard;
