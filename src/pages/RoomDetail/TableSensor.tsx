import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip} from "@nextui-org/react";
import { ISensorData } from "../../models/SensorData.model";
import React, { useMemo, useState } from "react";

const allColumns  = [
  { name: 'Date', uid: 'date' },
  { name: 'Time', uid: 'time' },
  { name: 'Detection', uid: 'detection' },
  { name: 'MQ2', uid: 'mq2' },
  { name: 'Temperature', uid: 'temperature' },
  { name: 'Humidity', uid: 'humidity' },
  { name: 'Status', uid: 'status' },
];
type TableProps = {
  data: ISensorData[];
  type: string | null;
  isLoading?: boolean;
};
export default function TableSensor(props: TableProps) {
  const filteredColumns = useMemo(() => {
    if (props.type === "DHT11") {
      return allColumns.filter((col) => ["date", "time", "temperature", "humidity", "status"].includes(col.uid));
    }
    if (props.type === "PIR") {
      return allColumns.filter((col) => ["date", "time", "detection", "status"].includes(col.uid));
    }
    if (props.type === "MQ2") {
      return allColumns.filter((col) => ["date", "time", "mq2", "status"].includes(col.uid));
    }
    if (props.type === "FLAME") {
      return allColumns.filter((col) => ["date", "time", "detection", "status"].includes(col.uid));
    }
    return allColumns; // Default: show all columns
  }, [props.type]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCell = React.useCallback((data: ISensorData, columnKey: any) => {
    switch (columnKey) {
        case 'date':
          return <h5>{data.createAt}</h5>;
        case 'time':
          return <h5>{data.createAt}</h5>
        case 'temperature':
          return <h5>{data.temperature}</h5>
        case 'humidity':
          return <h5>{data.humidity}</h5>
        case 'status':
          return (
              <Chip
                  className="capitalize"
                  color={data.temperature === null ||data.humidity === null ? 'danger' : 'success'}
                  size="sm"
                  variant="flat"
              >
                  {data.temperature === null ||data.humidity === null ? 'Off' : 'On'}
              </Chip>
          );
        default:
            return null;
    }
  }, []);
  return (
    <Table 
      aria-label="Example table with dynamic content" 
      removeWrapper
      >
      
      <TableHeader columns={filteredColumns} >
        {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "status" ? "center" : "start"}
              className="bg-primary text-white"
              // allowsSorting={column.sortable}
            >
              {column.name.toUpperCase()}
            </TableColumn>
          )}
      </TableHeader>
      <TableBody
        emptyContent={<h5>Không có kết quả nào</h5>}
        items={props.data}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
