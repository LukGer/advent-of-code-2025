const file = Bun.file("./input.txt");
const text = await file.text();
const rows = text.split("\n");

const grid = rows.map((row) => row.split(""));

const splitterSet = new Set<string>();
const branchSet = new Set<string>();

traverseBeam(grid[0]!.indexOf("S"), 0, grid, splitterSet, branchSet);

function traverseBeam(
	x: number,
	y: number,
	grid: string[][],
	splitterSet: Set<string>,
	branchSet: Set<string>,
) {
	if (branchSet.has(`${x},${y}`)) {
		return;
	}

	branchSet.add(`${x},${y}`);

	let char = grid[y]![x]!;

	while (char !== "^" && y < grid.length - 1) {
		char = grid[y]![x]!;
		y++;
	}

	if (char === "^") {
		y--;
		splitterSet.add(`${x},${y}`);
		traverseBeam(x - 1, y, grid, splitterSet, branchSet);
		traverseBeam(x + 1, y, grid, splitterSet, branchSet);
	}
}

console.log(splitterSet.size);
