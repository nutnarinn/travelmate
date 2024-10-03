export function findBestMatches(authorFreeTimes, participantsFreeTimes) {
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

    const newOverlapIntervals = [];

    overlapIntervals.forEach((authorInterval) => {
      participantIntervals.forEach((participantInterval) => {
        const overlapStart = new Date(Math.max(authorInterval.start, participantInterval.start));
        const overlapEnd = new Date(Math.min(authorInterval.end, participantInterval.end));

        const areAdjacent =
          authorInterval.end.getTime() === participantInterval.start.getTime() ||
          participantInterval.end.getTime() === authorInterval.start.getTime();

        if (overlapStart < overlapEnd || areAdjacent) {
          newOverlapIntervals.push({
            start: overlapStart,
            end: areAdjacent
              ? new Date(Math.max(authorInterval.end, participantInterval.end))
              : overlapEnd,
          });
        }
      });
    });

    overlapIntervals = newOverlapIntervals;

    if (overlapIntervals.length === 0) {
      return { overlapIntervals: [], matchCount };
    }
  }

  overlapIntervals = overlapIntervals.filter(interval => interval.start < interval.end);

  return { overlapIntervals };
}
