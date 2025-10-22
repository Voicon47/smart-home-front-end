import DashBoardStat from "../pages/homePage/DashBoardStat";

export default function NotificationBar() {
  return (
    <div className="sticky top-0 w-full h-full bg-primary text-white p-5  z-50">
      <DashBoardStat widgetData={{
        "location": "Ho CHi Minh, Việt Nam",
        "timezone": "UTC+7",
        "temperature": "30°C",
        "weather": "Nắng nhẹ",
        "date": "Thứ Tư, ngày 10 tháng 7 năm 2025"
      }} />
    </div>
  );
}