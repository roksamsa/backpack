import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@nextui-org/input";
import * as MdIcons from "react-icons/md";

import styles from "./IconSelector.module.scss";
import InfiniteScroll from "react-infinite-scroller";

const IconPicker = ({
  onSelectIcon,
}: {
  onSelectIcon: (iconName: string) => void;
}) => {
  const allIcons = Object.keys(MdIcons); // Get all Material Icons
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredIcons, setFilteredIcons] = useState<string[]>([]); // Filtered icons based on search

  // Filter icons based on search query
  useEffect(() => {
    const filtered = allIcons.filter((iconName) =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredIcons(filtered);
  }, [searchQuery, allIcons]);

  return (
    <div>
      <Input
        type="text"
        label="Section icon"
        placeholder="Find icon for new section"
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <div className={styles.modalIconsWrapper}>
        <div className={styles.modalIcons}>
          {filteredIcons.map((iconName) => {
            const IconComponent = MdIcons[iconName as keyof typeof MdIcons];
            return (
              <div
                key={iconName}
                className={styles.icon}
                onClick={() => onSelectIcon(iconName)}
              >
                <IconComponent size={24} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IconPicker;
