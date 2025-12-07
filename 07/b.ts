const file = Bun.file("./input.txt");
const text = await file.text();
const rows = text.split("\n");

const grid = rows.map((row) => row.split(""));

const cache = new Map<string, number>();

const result = traverseBeam(grid[0]!.indexOf("S"), 0, grid, cache);

function traverseBeam(
	x: number,
	y: number,
	grid: string[][],
	cache: Map<string, number>,
): number {
	let char = grid[y]![x]!;

	while (char !== "^" && y < grid.length - 1) {
		char = grid[y]![x]!;
		y++;
	}

	if (char === "^") {
		if (cache.has(`${x},${y}`)) {
			return cache.get(`${x},${y}`)!;
		}
		const result =
			traverseBeam(x - 1, y, grid, cache) + traverseBeam(x + 1, y, grid, cache);
		cache.set(`${x},${y}`, result);
		return result;
	}

	return 1;
}

console.log(result);
