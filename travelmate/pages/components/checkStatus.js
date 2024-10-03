import { findBestMatches } from "./findBestMatches";

export function checkStatus(authorFreeTimes, participantsFreeTimes) {

  // If either the author or participants haven't provided free times
  if (authorFreeTimes.length === 0 || participantsFreeTimes.length === 0) {
    return 'Pending';
  }

  // Find best matches between author and participants
  const bestMatches = findBestMatches(authorFreeTimes, participantsFreeTimes);

  // If no best matches found
  if (!bestMatches || bestMatches.length === 0) {
    return 'No Match';
  }

  // Check if all participants have a best match
  const allParticipantsMatch = participantsFreeTimes.every((participantTimes) => {
    const matches = findBestMatches(authorFreeTimes, [participantTimes]);
    return matches && matches.length > 0;
  });

  // If all participants match
  if (allParticipantsMatch) {
    return 'Complete';
  }

  // If some but not all participants match
  return 'Partial Match';
}
