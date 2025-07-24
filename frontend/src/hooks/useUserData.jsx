import { useDispatch } from 'react-redux';
import { setLikedVideos, setLikedTweets, setLikedComments } from '../store/LikesSlice';
import { setSubscribedChannels } from '../store/subsStore';
import LikeService from '../service/like';
import SubService from '../service/subscription';

export const useUserData = () => {
  const dispatch = useDispatch();

  const fetchUserData = async (accessToken,userId) => {
    //console.log(`Fetching user data with access token: ${accessToken}, userId: ${userId}`);
    try {
      // const userData = await getUserData(accessToken,userId);
      const [likedVideos, likedPosts, likedComments, subscribedChannels] =
      await Promise.all([
        LikeService.getLikedVideos(accessToken),
        LikeService.getLikedTweet(accessToken),
        LikeService.getLikedComment(accessToken),
        SubService.getSubscribedChannel(accessToken, userId),
      ]);
      
      dispatch(setLikedVideos(likedVideos.data));
      dispatch(setLikedTweets(likedPosts.data));
      dispatch(setLikedComments(likedComments.data));
      dispatch(setSubscribedChannels(subscribedChannels.data));
      
      return {
        likedVideos,
        likedPosts,
        likedComments,
        subscribedChannels,
      };
    } catch (error) {
      console.error('Failed to fetch user data:', error.response.data.message || error.message);
      throw error;
    }
  };

  return { fetchUserData };
};