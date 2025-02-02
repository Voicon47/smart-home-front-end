import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip} from "@nextui-org/react";
import { ISensorData } from "../models/SensorData.model";
import React from "react";

const columns = [
  { name: 'Date', uid: 'date' },
  { name: 'Time', uid: 'time' },
  { name: 'Temperature', uid: 'temperature' },
  { name: 'Humidity', uid: 'humidity' },
  { name: 'Status', uid: 'status' },
];
type TableProps = {
  data: ISensorData[];
  isLoading?: boolean;
};
export default function TableItem(props: TableProps) {

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
        // case 'thumbnail':
        //     return <Image width={200} alt={course.title} src={course.thumbnail} />;
        // case 'status':
        //     return (
        //         <Chip
        //             className="capitalize"
        //             color={course.status === IStatusCourse.ComingSoon ? 'danger' : 'success'}
        //             size="sm"
        //             variant="flat"
        //         >
        //             {course.status === IStatusCourse.ComingSoon ? 'Chuẩn bị ra mắt' : 'Đã ra mắt'}
        //         </Chip>
        //     );
        // case 'description':
        //     return <h5 className="w-[10rem] truncate">{course.description}</h5>;
        // case 'category':
        //     return course?.categoryCourse ? (
        //         <div className="flex justify-start items-center gap-2 ">
        //             <Chip variant="flat" color="secondary">
        //                 #
        //                 {course?.categoryCourse?.categoryName
        //                     ? course?.categoryCourse?.categoryName.toUpperCase()
        //                     : ''}
        //             </Chip>
        //         </div>
        //     ) : (
        //         <Chip variant="flat" color="secondary">
        //             Chưa cập nhật
        //         </Chip>
        //     );
        // case 'actions':
        //     return (
        //         <div className="relative flex items-center gap-2">
        //             <span className="text-lg text-danger cursor-pointer active:opacity-50">
        //                 <IoMdTrash className="text-xl" />
        //             </span>
        //         </div>
        //     );
        default:
            return null;
    }
  }, []);
  return (
    <Table 
      aria-label="Example table with dynamic content" 
      removeWrapper
      >
      
      <TableHeader columns={columns} >
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
