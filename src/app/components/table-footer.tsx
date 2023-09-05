interface TableFooterProps {
    onNextPage: () => void;
    onPreviousPage: () => void;
    onPageSelect: (page: number) => void;
    currentPage: number;
    pageNumber: number;
    itemsPerPage: number;
    totalCount: number;
}

const TableFooter: React.FC<TableFooterProps> = ({onNextPage, onPreviousPage, onPageSelect, currentPage, pageNumber, itemsPerPage, totalCount}) => {

    const getPaginationText = () => {
        const from = (currentPage-1) * itemsPerPage + 1;
        const to = itemsPerPage * currentPage > totalCount ? totalCount : itemsPerPage * currentPage;

        return `${from}-${to}`;
    };

    const getPaginationButtons = () => {
        const buttons = [];

        for (let i = 1; i <= pageNumber; i++) {
            if (i === 1 || i === pageNumber || (i >= currentPage - 1 && i <= currentPage + 1)) {
                buttons.push(
                    <li key={i}>
                        <button onClick={() => onPageSelect(i)}
                                className={`flex items-center justify-center px-3 py-2 text-sm leading-tight border 
                                           ${currentPage === i ? 'bg-blue-100 text-blue-600 border-blue-300' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                        >
                            {i}
                        </button>
                    </li>
                );
            } else if (i === 2 || i === pageNumber - 1) {
                buttons.push(
                    <li key={i}>
                        <span className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white dark:text-gray-400">...</span>
                    </li>
                );
            }
        }

        return buttons;
    };

    return (
        <tfoot className="w-full py-20 bg-white rounded-b-lg shadow-md dark:bg-gray-800">
            <tr>
                <td colSpan={3} className="py-5 pl-6">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Mostrando <span className="font-semibold text-gray-900 dark:text-white">{getPaginationText()}</span> de <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span>
                    </span>
                </td>
                <td colSpan={3} align="right">
                    <ul className="inline-flex items-stretch -space-x-px mr-6">
                        <li>
                            <button onClick={onPreviousPage} disabled={currentPage === 1}
                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                        {getPaginationButtons()}
                        <li>
                            <button onClick={onNextPage} disabled={currentPage === pageNumber}
                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </td>
            </tr>
        </tfoot>
    );
}

export default TableFooter;
