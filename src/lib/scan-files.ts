export function fileNameFromPath(path: string): string {
  const base = path.split("/").pop() || path;
  const underscore = base.indexOf("_");
  return underscore >= 0 ? base.slice(underscore + 1) : base;
}
