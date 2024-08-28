export const calculateHoursSinceFed = (lastFedTime: Date) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - lastFedTime.getTime();
    return Math.floor(timeDifference / (60 * 60 * 1000));
  }