'use client';

import { DeleteIcon, EditIcon, QRCodeIcon } from "./icons";

interface ActionDropdownProps {
    isOpen: boolean;
    showActions: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onShowQR: () => void;
}

export const ActionDropdown = ({isOpen, showActions, onEdit, onDelete, onShowQR}: ActionDropdownProps) => {
    return (
        <>
            <button onClick={showActions} id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
            {isOpen &&
                <div id="dropdownDotsHorizontal" className="absolute z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 w-full text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                        <li className="rounded-md">
                            <button onClick={onEdit} className="flex flex-row items-center gap-2 text-start px-4 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">
                                <EditIcon size={16} />
                                Editar
                            </button>
                        </li>
                        <li className="rounded-md">
                            <button onClick={onDelete} className="flex flex-row items-center gap-2 text-start px-4 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">
                                <DeleteIcon size={16} color="#FF2323" />
                                Eliminar
                            </button>
                        </li>
                        <li className="rounded-md">
                            <button onClick={onShowQR} className="flex flex-row items-center gap-2 text-start px-4 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white">
                                <QRCodeIcon size={16} />
                                Mostrar QR
                            </button>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}
