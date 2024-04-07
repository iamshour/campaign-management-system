const fileMimeTypes: Record<string, string[]> = {
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
	"text/csv": [".csv"],
}

export default fileMimeTypes
