export function formatLinesString(lines) {

    var result = "";

    for(let i = 0; i < lines.length; i++) {
        if (i >= lines.length - 1) {
            result += lines[i]
        } else {
            result += `${lines[i]}, `;
        }
    }

    return result;
}

export function parseDMY(str) {
  const [day, month, year] = str.split('-').map(Number);
  return new Date(year, month - 1, day).getTime();
}