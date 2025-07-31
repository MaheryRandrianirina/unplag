const path = require("path");

const buildEslintCommand = (files) => {
   `next lint --fix --file ${files.map(f => path.relative(process.cwd(), f)).join(" --file ")}`;
}

module.exports = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand]
}