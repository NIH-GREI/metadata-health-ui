"use client";

import { Table, TableHeader, Column, TableBody, Row, Cell } from "react-aria-components";

const data = [
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago" },
];

export default function SimpleTable() {
  return (
    <Table aria-label="Example Table" className="border border-gray-300 rounded-lg w-full">
      <TableHeader className="bg-gray-200">
        <Column isRowHeader className="p-2 border-b">Name</Column>  {/* Fix: Add isRowHeader */}
        <Column className="p-2 border-b">Age</Column>
        <Column className="p-2 border-b">City</Column>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <Row key={item.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-300 transition">
            <Cell className="p-2 border-b">{item.name}</Cell>
            <Cell className="p-2 border-b">{item.age}</Cell>
            <Cell className="p-2 border-b">{item.city}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
