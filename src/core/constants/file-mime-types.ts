const fileMimeTypes: Record<string, string[]> = {
	"text/csv": [".csv"],
	"application/vnd.ms-excel": [".xls", ".xlsx", ".xlsm", ".xlsb", ".xltx", ".xltm", ".xlam"],
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
		".xls",
		".xlsx",
		".xlsm",
		".xlsb",
		".xltx",
		".xltm",
		".xlam",
	],
}

export default fileMimeTypes
