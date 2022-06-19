const Jimp = require('jimp');

getPuzzlePosition = async (imgDataUri) => {
	let puzzleRect = {
		x: 0,
		y: 0,
		width: 54,
		height: 54,
	};

	let backgroundRect = {
		x: 110,
		y: 0,
		width: 250,
		height: 54,
	};

	// prepare basic image
	const basicImg = await Jimp.read(Buffer.from(imgDataUri, 'base64'));
	basicImg.greyscale().contrast(0.5);

	// find image top
	for (let y = 0; y < basicImg.bitmap.height; y++) {
		let pixelColors = Jimp.intToRGBA(basicImg.getPixelColor(30, y));
		if (pixelColors.a === 255) {
			puzzleRect.y = backgroundRect.y = y;
			break;
		}
	}

	// prepare puzzle
	puzzleImg = basicImg
		.clone()
		.crop(puzzleRect.x, puzzleRect.y, puzzleRect.width, puzzleRect.height);

	// prepare background
	backgroundImg = basicImg
		.clone()
		.crop(
			backgroundRect.x,
			backgroundRect.y,
			backgroundRect.width,
			backgroundRect.height
		)
		.invert();

	// find best position
	const bestSlider = {
		position: 0,
		difference: 100,
	};

	let endPosition = backgroundRect.width - puzzleRect.width;
	for (let position = 0; position < endPosition; position++) {
		let composeResult = await backgroundImg
			.clone()
			.composite(puzzleImg, position, 0);

		let difference = Jimp.diff(backgroundImg, composeResult).percent * 100;

		if (difference < bestSlider.difference) {
			bestSlider.difference = difference;
			bestSlider.position = position;
		}
	}

	return { x: 50 + bestSlider.position, y: backgroundRect.y };
};
