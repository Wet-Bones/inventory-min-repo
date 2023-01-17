import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, chakra, Container, Flex, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useAllItems } from './hooks/useAllItems';

export type Item = {
  itemId: string;
  info: string;
  stock: number;
  location: string;
}

const defaultColumn: Partial<ColumnDef<Item>> = {
  cell: function Cell ({ getValue }) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])


    return (
    <Input
        flex={'auto'}
        value={value as string}
        onChange={e => setValue(e.target.value)}
    />
    )
  }
}

function ItemTable() {
  const data = useAllItems();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const columnHelper = createColumnHelper<Item>();

  const columns = [
    columnHelper.accessor("itemId", {
      header: "Item ID",
      footer: (info: { column: { id: any; }; }) => info.column.id
    }),
    columnHelper.accessor("info", {
      header: "Info",
      footer: (info: { column: { id: any; }; }) => info.column.id
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
      meta: {
        isNumeric: true
      },
      footer: (info: { column: { id: any; }; }) => info.column.id
    }),
    columnHelper.accessor("location", {
      header: "Location",
      footer: (info: { column: { id: any; }; }) => info.column.id
    })
  ];

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
    rowSelection,
    sorting,
    },
    debugTable: true,
  });

  return (
    <Container maxW={'100%'}>
      <Box>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          </Flex>
      </Box>
      <Flex justify={'center'} >
      <div className="Home">
        <TableContainer maxWidth={1000}>
          <Table variant='striped' colorScheme='teal'>
          <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                  const meta: any = header.column.columnDef.meta;
                  return (
                      <Th
                      colSpan={header.colSpan}
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      >
                      {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                      )}
                      <chakra.span pl={'4'}>
                          {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                          )
                          ) : null}
                      </chakra.span>
                      </Th>
                  );
                  })}
              </Tr>
              ))}
          </Thead>
          <Tbody>
              {table.getRowModel().rows.map(row => {
              return(
              <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                  const meta: any = cell.column.columnDef.meta;
                  return (
                      <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}>
                      {flexRender(
                          cell.column.columnDef.cell, 
                          cell.getContext()
                          )}
                      </Td>
                      )
                  })}
              </Tr>
              )
          })}
          </Tbody>
          </Table>
        </TableContainer>
      </div>
      </Flex>
  </Container>
    );
}

export default ItemTable