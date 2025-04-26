export const totalLevels = 510; // 总关卡数
export const groupSize = 60; // 每组关卡数

// 动态生成关卡范围数组
export const levelRanges = Array.from(
  { length: Math.ceil(totalLevels / groupSize) },
  (_, i) => {
    const start = i * groupSize + 1;
    const end = Math.min((i + 1) * groupSize, totalLevels);
    return { start, end };
  }
);
