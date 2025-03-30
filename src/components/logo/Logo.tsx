import React from "react";
import LogoSvg from "./LogoSvg";

import { MdArrowBackIosNew } from "react-icons/md";
import { Button } from "@heroui/button";

import styles from "./Logo.module.scss";

interface Props {
    isSidebarClosed?: boolean;
    isToggleButtonVisible?: boolean;
    setIsSidebarClosed?: (isClosed: boolean) => void;
}

const Logo = ({
    isSidebarClosed = false,
    isToggleButtonVisible = true,
    setIsSidebarClosed = () => { },
}: Props) => {
    return (
        <div
            className={`${styles.logo} ${isSidebarClosed ? styles.sidebarClosed : ""
                }`}
        >
            <div className={styles.logoSvg}>
                <LogoSvg />
            </div>
            <div className={styles.logoText}>Backpack</div>
            {isToggleButtonVisible && (
                <div className={styles.arrowToggleSidebar}>
                    <Button
                        isIconOnly
                        radius="full"
                        className={styles.arrowToggleWrapper}
                        onClick={() => setIsSidebarClosed(!isSidebarClosed)}
                    >
                        <MdArrowBackIosNew />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Logo;
