import React, { useEffect, useState } from 'react';
import {
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender,
} from '@tanstack/react-table';
import UseAxiosSecure from '../../../Hook/UseAxiosSecure';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hook/UseAuth';
import { NavLink } from 'react-router';

const MyPets = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/pets?email=${user.email}`).then(res => {
                setPets(res.data);
            });
        }
    }, [user, axiosSecure]);

    const handleAdopted = async (id) => {
        const res = await axiosSecure.patch(`/pets/adopt/${id}`);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Pet marked as adopted!", "success");
            setPets(prev => prev.map(p => p._id === id ? { ...p, adopted: true } : p));
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the pet permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/pets/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your pet has been deleted.", "success");
                    setPets(prev => prev.filter(p => p._id !== id));
                }
            }
        });
    };

    const columns = React.useMemo(() => [
        {
            header: "S/N",
            accessorFn: (row, i) => i + 1
        },
        {
            header: "Pet Name",
            accessorKey: "name"
        },
        {
            header: "Category",
            accessorKey: "category"
        },
        {
            header: "Image",
            accessorKey: "image",
            cell: info => <img src={info.getValue()} alt="pet" className="w-12 h-12 object-cover rounded" />
        },
        {
            header: "Status",
            accessorKey: "adopted",
            cell: info => info.getValue() ? "Adopted" : "Not Adopted"
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const pet = row.original;
                return (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleAdopted(pet._id)}
                            disabled={pet.adopted}
                            className="btn btn-xs btn-success"
                        >
                            Adopted
                        </button>
                        <button
                            onClick={() => handleDelete(pet._id)}
                            className="btn btn-xs btn-error"
                        >
                            Delete
                        </button>
                        <NavLink
                            to={`/dashboard/user/update-pet/${pet._id}`}
                            className="btn btn-xs btn-info"
                        >
                            Update
                        </NavLink>
                    </div>
                );
            }
        }
    ], []);

    const table = useReactTable({
        data: pets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        // ✅ LIMIT to 10 per page
        state: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            }
        },
        onPaginationChange: () => { }, // required placeholder if using `state.pagination`
        manualPagination: false,
    });

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Pets</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getIsSorted() === 'asc' && ' 🔼'}
                                                {header.column.getIsSorted() === 'desc' && ' 🔽'}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <div className="flex gap-2">
                        <button
                            className="btn btn-sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPets;
