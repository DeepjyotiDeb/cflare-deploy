export const bytesToSize = (bytes: number) => {
	const kilobyte = 1024;
	const megabyte = kilobyte * 1024;
	// console.log('bytesToSize', bytes);
	if (bytes < kilobyte) {
		return bytes + ' Bytes';
	} else if (bytes < megabyte) {
		return (bytes / kilobyte).toFixed(2) + ' KB';
	} else {
		return (bytes / megabyte).toFixed(2) + ' MB';
	}
};
