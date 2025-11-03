import { useEffect, useState } from "react";
import { handleFollowOrUnFollow } from "../services/user.service";
import type { IFollow, IUser } from "../types/user.type";
import errorHandler from "../utils/errorHandle";

export const useFollowToggle = (
  targetUser: IUser | null,
  currentUserId: string,
  onUpdateUser?: (user: IUser) => void
) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🧠 Xác định lại isFollowing mỗi khi targetUser thay đổi
  useEffect(() => {
    if (!targetUser || !currentUserId) return;

    const isFollowed =
      Array.isArray(targetUser.followed) &&
      targetUser.followed.some((f: any) =>
        typeof f === "string" ? f === currentUserId : f._id === currentUserId
      );

    setIsFollowing(isFollowed);
  }, [targetUser?._id, currentUserId, targetUser?.followed?.length]);

  const handleToggleFollow = async () => {
    if (!targetUser || !currentUserId || isLoading) return;

    setIsLoading(true);
    const payload: IFollow = {
      authorId: currentUserId,
      followerId: targetUser._id,
    };

    try {
      // Nếu đang follow thì unfollow
      if (isFollowing) {
        await handleFollowOrUnFollow(payload, 2);
        setIsFollowing(false);

        // Cập nhật lại state user
        onUpdateUser?.({
          ...targetUser,
          followed: (targetUser.followed || []).filter((f: any) =>
            typeof f === "string" ? f !== currentUserId : f._id !== currentUserId
          ),
        });
      } else {
        // Follow
        await handleFollowOrUnFollow(payload, 1);
        setIsFollowing(true);

        onUpdateUser?.({
          ...targetUser,
          followed: [...(targetUser.followed || []), currentUserId],
        });
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleToggleFollow, isFollowing, isLoading };
};
