interface ClassWidgetProps {
  name: string;
  id: string;
}

export default function ClassWidget(props: ClassWidgetProps) {
  return (
    <div
      className="bg-gray-300 border-gray-500 border-2 rounded-xl 
      min-h-36 flex cursor-pointer hover:bg-gray-400 transition duration-100 ease-in-out"
    >
      <div className="m-4">
        <p className="text-2xl">{props.name}</p>
      </div>
    </div>
  );
}
