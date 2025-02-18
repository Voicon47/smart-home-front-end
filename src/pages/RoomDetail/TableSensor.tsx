import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Spinner} from "@nextui-org/react";
import { ISensorData } from "../../models/SensorData.model";
import React, { useEffect, useMemo, useState } from "react";

const allColumns  = [
  { name: 'Date', uid: 'date' },
  { name: 'Time', uid: 'time' },
  { name: 'PIR Detection', uid: 'pirDetection' },
  { name: 'Flame Detection', uid: 'flameDetection' },
  { name: 'MQ2', uid: 'mq2' },
  { name: 'Temperature', uid: 'temperature' },
  { name: 'Humidity', uid: 'humidity' },
  { name: 'Status', uid: 'status' },
];
export type ISensorDataTable = {
  _id?: string,
  sensorId: string,
  createAt: string,
  temperature?: number,
  humidity?: number,
  mq2?: number,
  flame?: boolean,
  pir?: boolean,
  _destroy: boolean
  createdAtDate: string,
  createdAtTime: string

}
type TableProps = {
  data: ISensorDataTable[];
  type: string | null;
  isLoading?: boolean;
};
export default function TableSensor(props: TableProps) {
  console.log("Table: ",props.isLoading)
  const filteredColumns = useMemo(() => {
    if (props.type === "DHT11") {
      return allColumns.filter((col) => ["date", "time", "temperature", "humidity", "status"].includes(col.uid));
    }
    if (props.type === "PIR") {
      return allColumns.filter((col) => ["date", "time", "pirDetection", "status"].includes(col.uid));
    }
    if (props.type === "MQ-2") {
      return allColumns.filter((col) => ["date", "time", "mq2", "status"].includes(col.uid));
    }
    if (props.type === "FLAME") {
      return allColumns.filter((col) => ["date", "time", "flameDetection", "status"].includes(col.uid));
    }
    return allColumns; // Default: show all columns
  }, [props.type]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCell = (data: ISensorDataTable, columnKey: any) => {
    switch (columnKey) {
        case 'date':
          return <h5>{data.createdAtDate}</h5>;
        case 'time':
          return <h5>{data.createdAtTime}</h5>
        case 'temperature':
          return <h5>{data.temperature}</h5>
        case 'humidity':
          return <h5>{data.humidity}</h5>
        case 'mq2':
          return <h5>{data.mq2}</h5>
        case 'pirDetection':
          return <h5>{data.pir}</h5>
        case 'flameDetection':
          return <h5>{data.flame}</h5>
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
  }
  useEffect(() => {
    console.log("Table Data Updated: ", props.data);
  }, [props.data]);
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
        isLoading={props.isLoading}
        loadingContent={<Spinner label="Loading..." />}
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
