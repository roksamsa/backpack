import React from "react";
import styles from "./UserProfile.module.scss";

import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/skeleton";
import { CustomSession } from "@/utils/interfaces";
import { useRouter } from "next/navigation";

const UserProfile = ({ isSidebarClosed }: { isSidebarClosed: boolean }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const customSession = session as CustomSession;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div
      className={`${styles.userProfileWrapper} ${
        isSidebarClosed ? styles.sidebarClosed : ""
      }`}
      onClick={handleSignOut}
    >
      {customSession?.user ? (
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            {customSession?.user?.image ? (
              <img
                alt={customSession?.user?.name || ""}
                title={customSession?.user?.name || ""}
                src={customSession?.user?.image}
              />
            ) : (
              <div className={styles.userAvatarWithFirstLetter}>
                {customSession?.user?.name?.[0]}
                {customSession?.user?.lastname &&
                  customSession?.user?.lastname?.[0]}
              </div>
            )}
          </div>
          <div className={styles.userText}>
            <div className={styles.userName}>
              {customSession?.user?.name}
              {customSession?.user?.lastname &&
                ` ${customSession.user.lastname}`}
            </div>
            <div className={styles.userEmail}>{customSession?.user?.email}</div>
          </div>
        </div>
      ) : (
        <div className={styles.userProfileLoading}>
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
