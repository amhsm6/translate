"use client"
 
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import Link from "next/link";

export type TaskHeader = {
    id: string,
    title: string,
    source_lang: string,
    target_lang: string,
};
 
export const columns: ColumnDef<TaskHeader>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "source_lang",
        header: "Source"
    },
    {
        accessorKey: "target_lang",
        header: "Target"
    },
    {
        id: "button",
        header: () => { return <span></span> },
        accessorFn: (data, index) => data.id,
        cell: ({ getValue }) => {
            const id = getValue();
            return (
                <div className="text-right">
                    <Link
                        href={ `/task/${id}` }
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    >
                        Open
                    </Link>
                </div>
            );
        }
    }
]

type Props = { tasks: TaskHeader[] };
 
export default function TaskTable({ tasks }: Props) {
    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel()
    });
 
    return (
        <Table>
            <TableHeader>
                { table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={ headerGroup.id }>
                        { headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                { flexRender(header.column.columnDef.header, header.getContext()) }
                            </TableHead>
                        )) }
                    </TableRow>
                )) }
            </TableHeader>
            <TableBody>
                { table.getRowModel().rows.map(row => (
                    <TableRow key={ row.id }>
                        { row.getVisibleCells().map(cell => (
                            <TableCell key={ cell.id }>
                                { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                            </TableCell>
                        )) }
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    );
}
