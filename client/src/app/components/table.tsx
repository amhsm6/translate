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
import { Button } from "@/components/ui/button";

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
        header: () => {},
        accessorFn: (data, index) => data.id,
        cell: ({ getValue }) => {
            const id = getValue();
            // return <Link href={ `/task/${id}` } className="">Open</Link>;
            return <Button>Open</Button>;
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
                                { header.isPlaceholder ? (
                                    null
                                ) : (
                                    flexRender(header.column.columnDef.header, header.getContext())
                                ) }
                            </TableHead>
                        )) }
                    </TableRow>
                )) }
            </TableHeader>
            <TableBody>
                { table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row => (
                        <TableRow
                            key={ row.id }
                            data-state={ row.getIsSelected() && "selected" }
                        >
                            { row.getVisibleCells().map(cell => (
                                <TableCell key={ cell.id }>
                                    { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                                </TableCell>
                            )) }
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={ columns.length } className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                ) }
            </TableBody>
        </Table>
    );
}
