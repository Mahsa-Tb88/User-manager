const branches = [
  { id: 1, branchName: "First" },
  { id: 2, branchName: "Second" },
];

if (!localStorage.branches) {
  localStorage.branches = JSON.stringify(branches);
}
