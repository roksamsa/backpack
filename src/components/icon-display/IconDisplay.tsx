import * as MdIcons from "react-icons/md";

const IconDisplay = ({
  iconName,
  className,
}: {
  iconName: string;
  className: string;
}) => {
  // Retrieve the icon component from MdIcons
  const IconComponent = MdIcons[iconName as keyof typeof MdIcons];

  // Check if IconComponent is valid
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
