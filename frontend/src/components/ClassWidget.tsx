interface ClassWidgetProps {
  name: string;
  id: string;
}

export default function ClassWidget(props: ClassWidgetProps) {
  return (
    <div className="bg-gray-300 rounded-xl min-h-36 flex ">
      <div className="m-4">
        <p className="text-2xl">{props.name}</p>
      </div>
    </div>
  );
}
