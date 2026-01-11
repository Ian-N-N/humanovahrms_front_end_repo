import React from 'react';

const Table = ({ columns, data, onRowClick }) => {
    if (!data || data.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
                No data available to display.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        {columns.map((col, index) => (
                            <th key={index} className="px-6 py-4">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                    {col.render
                                        ? col.render(row)
                                        : (col.accessor ? row[col.accessor] : '-')
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
