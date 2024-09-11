import React, { useState, useEffect, useRef, useMemo } from "react";
import * as MdIcons from "react-icons/md";

import styles from "./IconSelector.module.scss";
import { Input } from "@nextui-org/input";

const IconPicker = ({
  onSelectIcon,
}: {
  onSelectIcon: (icon: string) => void;
}) => {
  const iconsPerPage = 45;
  const allIcons = useMemo(() => Object.keys(MdIcons), []);
  const [displayedIcons, setDisplayedIcons] = useState(
    allIcons.slice(0, iconsPerPage),
  );
  const [filteredIcons, setFilteredIcons] = useState<string[]>(allIcons);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName); // Mark the icon as selected
    onSelectIcon(iconName); // Pass the selected icon to the parent component
  };

  useEffect(() => {
    const filtered = allIcons.filter((iconName) =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredIcons(filtered); // Update filtered icons based on the search query
    setDisplayedIcons(filtered.slice(0, iconsPerPage)); // Reset displayed icons
    setPage(1); // Reset pagination
    setHasMore(filtered.length > iconsPerPage); // Check if there are more icons to load
  }, [searchQuery, allIcons]); // `allIcons` is static, so it's safe to include

  useEffect(() => {
    const container = containerRef.current;
    const loadMoreIcons = () => {
      const nextIcons = allIcons.slice(
        page * iconsPerPage,
        (page + 1) * iconsPerPage,
      );

      if (nextIcons.length === 0) {
        setHasMore(false);
        return;
      }

      setDisplayedIcons((prevIcons) => [...prevIcons, ...nextIcons]);
      setPage((prevPage) => prevPage + 1);
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore) {
        loadMoreIcons();
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, page, allIcons]);

  return (
    <div>
      <Input
        type="text"
        label="Section icon"
        placeholder="Find icon for new section"
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <div ref={containerRef} className={styles.modalIconsWrapper}>
        <div className={styles.modalIcons}>
          {displayedIcons.map((iconName) => {
            const isSelected = selectedIcon === iconName;
            const IconComponent = MdIcons[iconName as keyof typeof MdIcons];

            return (
              <div
                className={`${styles.icon} ${
                  isSelected ? styles.iconSelected : ""
                }`}
                key={iconName}
                onClick={() => handleIconClick(iconName)}
              >
                <IconComponent size={24} />
              </div>
            );
          })}
        </div>
      </div>
      {!hasMore && <p>No more icons to display</p>}
    </div>
  );
};

export default IconPicker;
