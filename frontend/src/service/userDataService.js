import LikeService from "./like";
import SubService from "./subscription";

const getUserData = async (accessToken, userId) => {
    
  try {
    const [likedVideos, likedPosts, likedComments, subscribedChannels] =
      await Promise.all([
        LikeService.getLikedVideos(accessToken),
        LikeService.getLikedTweet(accessToken),
        LikeService.getLikedComment(accessToken),
        SubService.getSubscribedChannel(accessToken, userId),
      ]);

    return {
      likedVideos,
      likedPosts,
      likedComments,
      subscribedChannels,
    };
  } catch (error) {
    console.error("Error fetching user data:", error.response);
    throw error;
  }
};

export default getUserData;
