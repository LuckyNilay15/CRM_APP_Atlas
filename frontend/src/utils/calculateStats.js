export const calculateStats = (totalSent, totalFailed) => {
    return {
      total: totalSent + totalFailed,
      successRate: ((totalSent / (totalSent + totalFailed)) * 100).toFixed(2),
    };
  };
  