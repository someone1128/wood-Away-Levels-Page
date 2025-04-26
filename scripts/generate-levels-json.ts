import fs from "fs";
import path from "path";
import levels from "../data/levels";

// 确保 data 目录存在
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// 将 levels 数据写入 JSON 文件
const levelsPath = path.join(dataDir, "levelsSitemap.json");
fs.writeFileSync(levelsPath, JSON.stringify(levels, null, 2));

console.log("Generated levels.json successfully");
