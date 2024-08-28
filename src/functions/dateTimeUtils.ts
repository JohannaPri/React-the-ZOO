/**
 * Beräknar antalet timmar sedan djuret senast blev matat.
 * 
 * @param lastFedTime - Tidpunkt då djuret senast blev matat.
 * @returns Antal timmar sedan senaste matning, avrundat nedåt.
 */

export const calculateHoursSinceFed = (lastFedTime: Date) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - lastFedTime.getTime();
    return Math.floor(timeDifference / (60 * 60 * 1000));
  }