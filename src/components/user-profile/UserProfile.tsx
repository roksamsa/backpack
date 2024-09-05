import React from "react";

import styles from "./UserProfile.module.scss";
import { useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/skeleton";

const UserProfile = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.userProfileWrapper}>
      {session?.user ? (
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            {session?.user?.image ? (
              <img
                title={session?.user?.name!}
                src={session?.user?.image!}
              ></img>
            ) : (
              <div className={styles.userAvatarWithFirstLetter}>
                {session?.user?.name?.[0]}
              </div>
            )}
          </div>
          <div className={styles.userText}>
            <div className={styles.userName}>{session?.user?.name}</div>
            <div className={styles.userEmail}>{session?.user?.email}</div>
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
