import { useEffect, useState, useCallback } from "react";
import { handleFollowOrUnFollow } from "../services/user.service";
import type { IFollow, IUser } from "../types/user.type";
import errorHandler from "../utils/errorHandle";

export const useFollowToggle = (
  targetUser: IUser | null, // người bị follow
  currentUserId: string, // người đang đăng nhập
  onUpdateUser?: (user: IUser) => void
) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra xem currentUser đã follow targetUser chưa
  const checkFollowStatus = useCallback(() => {
    if (!targetUser || !currentUserId) return;

    const isFollowed =
      Array.isArray(targetUser.followed) &&
      targetUser.followed.some((f: any) =>
        typeof f === "string" ? f === currentUserId : f._id === currentUserId
      );

    setIsFollowing(isFollowed);
  }, [targetUser?._id, targetUser?.followed, currentUserId]);

  useEffect(() => {
    if (targetUser && targetUser._id) checkFollowStatus();
  }, [targetUser?._id, targetUser?.followed?.length, checkFollowStatus]);

  const followUser = async () => {
    if (!targetUser || !currentUserId || isLoading) return;
    setIsLoading(true);

    const payload: IFollow = {
      currentUserId,
      targetUserId: targetUser._id,
    };
    console.log(payload);

    try {
      await handleFollowOrUnFollow(payload, 1);
      setIsFollowing(true);

      onUpdateUser?.({
        ...targetUser,
        followed: [...(targetUser.followed || []), currentUserId],
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Unfollow
  const unfollowUser = async () => {
    if (!targetUser || !currentUserId || isLoading) return;
    setIsLoading(true);

    const payload: IFollow = {
      currentUserId,
      targetUserId: targetUser._id,
    };

    try {
      await handleFollowOrUnFollow(payload, 2);
      setIsFollowing(false);

      onUpdateUser?.({
        ...targetUser,
        followed: (targetUser.followed || []).filter(
          (f: any) =>
            typeof f === "string" ? f !== currentUserId : f._id !== currentUserId
        ),
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isFollowing, isLoading, followUser, unfollowUser, checkFollowStatus };
};
