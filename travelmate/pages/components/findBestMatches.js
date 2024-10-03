export function findBestMatches(authorFreeTimes, participantsFreeTimes) {
  // Convert author's free times to Date objects
  let overlapIntervals = authorFreeTimes.map((time) => ({
    start: new Date(time.start),
    end: new Date(time.end),
  }));

  // Loop through participants' free times
  for (const participantTimes of participantsFreeTimes) {
    const participantIntervals = participantTimes.map((time) => ({
      start: new Date(time.start),
      end: new Date(time.end),
    }));

    // Find overlaps between author and participant times
    overlapIntervals = overlapIntervals.reduce((overlaps, authorInterval) => {
      participantIntervals.forEach((participantInterval) => {
        const overlapStart = new Date(Math.max(authorInterval.start, participantInterval.start));
        const overlapEnd = new Date(Math.min(authorInterval.end, participantInterval.end));

        // Push valid overlaps
        if (overlapStart < overlapEnd) {
          overlaps.push({ start: overlapStart, end: overlapEnd });
        }
      });
      return overlaps;
    }, []);
  }

  // Return overlapping intervals or null
  return overlapIntervals.length > 0 ? overlapIntervals : null;
}
