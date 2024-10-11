import * as MdIcons from "react-icons/md";

const IconDisplay = ({
  iconName,
  className,
}: {
  iconName: string;
  className: string;
}) => {
  const IconComponent = MdIcons[iconName as keyof typeof MdIcons];

  if (!IconComponent) {
    return <div></div>;
  }

  return (
    <div className={className}>
      <IconComponent size={24} />
    </div>
  );
};

export default IconDisplay;
