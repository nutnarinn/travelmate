import axios from "axios";
import { findBestMatches } from "./findBestMatches";

export async function checkStatus(postId) {
  try {
    // Fetch post data based on postId
    const { data: postData } = await axios.get(
      `http://localhost:1337/api/posts/${postId}?populate=*`
    );

    const post = postData?.data || null;
    if (!post) return "Pending";

    const authorFreeTimes = post.attributes.authorFreeTime || [];
    const participantsFreeTimes = post.attributes.participantFreeTimes || [];

    // If either the author or participants haven't provided free times
    if (authorFreeTimes.length === 0 || participantsFreeTimes.length === 0) {
      return "Pending";
    }

    // Find best matches between author and participants
    const { overlapIntervals } = findBestMatches(
      authorFreeTimes,
      participantsFreeTimes.map((p) => p.freeTimes)
    );

    // If no best matches found
    if (!overlapIntervals || overlapIntervals.length === 0) {
      return "No Match";
    }

    // Check if all participants matched
    let matchCount = 0;
    participantsFreeTimes.forEach((participantTimes) => {
      const { overlapIntervals: participantMatches } = findBestMatches(authorFreeTimes, [participantTimes.freeTimes]);
      if (participantMatches && participantMatches.length > 0) {
        matchCount++;
      }
    });

    // If all participants matched
    if (matchCount === participantsFreeTimes.length) {
      return "Complete";
    }

    // If some participants matched
    if (matchCount > 0 && matchCount < participantsFreeTimes.length) {
      return "Partial Match";
    }

    // If no participants matched
    return "No Match";

  } catch (error) {
    console.error("Error fetching post data:", error);
    return "Pending"; // Default to Pending
  }
}
