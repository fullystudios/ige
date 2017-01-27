/* TODO: URGENT - Make this alignment stuff work inside the bounds of the entity it is attached to
 * so that bottom-right aligns to the lower-right point of the bounding box of the entity
 * whilst maintaining the current text-alignment as well
* */

/**
 * Creates a new font sheet. A font sheet is an image that contains
 * letters and numbers rendered to specifications. It allows you to
 * use and render text fonts without the font actually existing on
 * the target system that the engine is running in.
 */
var IgeFontSheet = IgeTexture.extend({
	classId: 'IgeFontSheet',

	init: function (url) {
		IgeTexture.prototype.init.call(this, url);

		if (arguments[1]) {
			this.log('Font sheets no longer accept a caching limit value. All font output is now cached by default via the actual font entity - fontEntity.cache(true);', 'warning');
		}

		// Set the _noDimensions flag which tells any entity
		// that assigns this texture that the texture has an
		// unknown width/height so it should not get it's
		// dimension data from the texture
		this._noDimensions = true;

		// Set a listener for when the texture loads
		this.on('loaded', function () {
			if (this.image) {
				// Store the cell sheet image
				this._sheetImage = this.image;

				// Get the font sheet data header
				this._fontData = this.decodeHeader();

				// Cache access to looped data
				this._charCodeMap = this._fontData.characters.charCodes;
				this._charPosMap = this._fontData.characters.charPosition;
				this._measuredWidthMap = this._fontData.characters.measuredWidth;
				this._pixelWidthMap = this._fontData.characters.pixelWidth;

				if (this._fontData) {
					var header = this._fontData.font;
					this.log('Loaded font sheet for font: ' + header.fontName + ' @ ' + header.fontSize + header.fontSizeUnit + ' in ' + header.fontColor);
				} else {
					this.log('Could not load data header for font sheet: ' + this.image.src, 'error');
				}
			}
		});
	},

	decodeHeader: function () {
		// Create a temporary canvas
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');

		// Set canvas width to match font sheet image and
		// height to 1 as we have 1 line of header data
		canvas.width = this.image.width;
		canvas.height = 1;

		// Draw the font sheet to the canvas
		ctx.drawImage(this.image, 0, 0);

		// Decode the font sheet pixel-encoded data
		return this._decode(canvas, 0, 0, this.image.width);
	},

	_decode: function (canvas, x, y, maxX) {
		"use strict";
		var ctx = canvas.getContext('2d'),
			imageData = ctx.getImageData(x, y, maxX, canvas.height).data,
			run = true,
			quadCode,
			i = 0,
			jsonString = '';

		while (run) {
			quadCode = String(imageData[i]) + ' ' + String(imageData[i + 1]) + ' ' + String(imageData[i + 2]);
			if (quadCode === '3 2 1') {
				// We have scanned the terminal code
				// so exit the loop
				run = false;
				// Temporailly fix. IE will return a false error, so hardcode this JSON string for the font VAGRundschriftD
				return {"vendor":{"generator":"Irrelon Font Sheet Generator","url":"http://www.isogenicengine.com/tools/fontSheetGenerator/index.html","provider":"Irrelon Software Limited","source":"https://github.com/irrelon/FontSheetGenerator"},"font":{"fontSize":61,"fontSizeUnit":"px","fontName":"VAGRundschriftD","fontColor":"#000000","fontWeight":"","fontStyle":""},"characters":{"characterList":" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ[\\]^_`abcdefghijklmnopqrstuvwxyzåäö{|}~","characterSpacing":1,"charCodes":{"32":0,"33":1,"34":2,"35":3,"36":4,"37":5,"38":6,"39":7,"40":8,"41":9,"42":10,"43":11,"44":12,"45":13,"46":14,"47":15,"48":16,"49":17,"50":18,"51":19,"52":20,"53":21,"54":22,"55":23,"56":24,"57":25,"58":26,"59":27,"60":28,"61":29,"62":30,"63":31,"64":32,"65":33,"66":34,"67":35,"68":36,"69":37,"70":38,"71":39,"72":40,"73":41,"74":42,"75":43,"76":44,"77":45,"78":46,"79":47,"80":48,"81":49,"82":50,"83":51,"84":52,"85":53,"86":54,"87":55,"88":56,"89":57,"90":58,"91":62,"92":63,"93":64,"94":65,"95":66,"96":67,"97":68,"98":69,"99":70,"100":71,"101":72,"102":73,"103":74,"104":75,"105":76,"106":77,"107":78,"108":79,"109":80,"110":81,"111":82,"112":83,"113":84,"114":85,"115":86,"116":87,"117":88,"118":89,"119":90,"120":91,"121":92,"122":93,"123":97,"124":98,"125":99,"126":100,"196":60,"197":59,"214":61,"228":95,"229":94,"246":96},"charPosition":[0,16.63720703125,33.2744140625,61.11083984375,96.2744140625,130.6337890625,180.6337890625,222.46923828125,238.5107421875,256.99462890625,275.5380859375,300.09814453125,333.62353515625,351.916015625,368.916015625,386.1787109375,414.4619140625,452.23388671875,473.79833984375,506.51953125,541.26611328125,575.26611328125,608.79150390625,642.79150390625,673.87451171875,708.23388671875,741.75927734375,759.02197265625,776.314453125,807.814453125,841.33984375,872.83984375,903.267578125,952.77490234375,991.77490234375,1027.4150390625,1063.4150390625,1103.4150390625,1132.50244140625,1161.50244140625,1203.50244140625,1246.171875,1264.18359375,1288.18359375,1326.18359375,1355.18359375,1406.18359375,1448.7041015625,1491.939453125,1526.939453125,1572.4384765625,1608.1083984375,1642.693359375,1674.693359375,1715.962890625,1754.962890625,1809.962890625,1848.25390625,1885.37060546875,1920.37060546875,1960.37060546875,1999.37060546875,2042.60595703125,2062.60595703125,2091.88916015625,2109.96875,2142.96875,2175.96875,2207.46875,2242.662109375,2277.662109375,2306.662109375,2341.4384765625,2375.666015625,2399.666015625,2434.2041015625,2468.5634765625,2485.23046875,2501.98681640625,2533.9931640625,2549.20068359375,2600.9248046875,2635.1650390625,2668.2734375,2703.2734375,2737.90087890625,2761.90087890625,2790.46923828125,2814.46923828125,2848.560546875,2879.560546875,2926.560546875,2959.560546875,2992.560546875,3021.560546875,3056.75390625,3091.947265625,3125.0556640625,3147.0556640625,3179.5556640625,3199.42236328125],"measuredWidth":[15.63720703125,15.63720703125,26.83642578125,34.16357421875,33.359375,48.81787109375,40.83544921875,15.04150390625,17.48388671875,17.54345703125,23.56005859375,32.525390625,16.29248046875,15.04150390625,16.2626953125,27.283203125,35.77197265625,21.564453125,31.72119140625,33.74658203125,32.525390625,32.525390625,32.525390625,30.0830078125,33.359375,32.525390625,16.2626953125,16.29248046875,30.5,32.525390625,30.5,29.427734375,47.50732421875,37.02294921875,34.64013671875,34.87841796875,38.83984375,28.08740234375,27.84912109375,40.865234375,41.66943359375,15.01171875,24.7216796875,36.60595703125,25.2578125,49.65185546875,41.5205078125,42.2353515625,33.68701171875,44.4990234375,34.669921875,32.5849609375,29.57666015625,40.26953125,36.42724609375,52.80908203125,37.291015625,35.11669921875,31.84033203125,37.02294921875,37.02294921875,42.2353515625,18.07958984375,27.283203125,18.07958984375,30.5,30.5,30.5,34.193359375,33.74658203125,27.87890625,33.7763671875,32.2275390625,21.7431640625,33.5380859375,33.359375,15.6669921875,15.75634765625,31.00634765625,14.20751953125,50.72412109375,33.240234375,32.1083984375,33.5380859375,33.62744140625,22.279296875,26.568359375,21.59423828125,33.09130859375,29.93408203125,45.4521484375,31.9296875,30.3212890625,27.37255859375,34.193359375,34.193359375,32.1083984375,19.86669921875,30.5,19.86669921875,40.65673828125],"pixelWidth":[14,14,24,34,32,49,40,12,16,15,23,32,16,17,14,27,34,19,31,32,33,31,33,30,33,32,14,16,29,32,29,29,45,39,34,35,39,28,28,41,40,13,25,37,28,50,40,42,34,44,34,32,32,39,37,55,37,35,34,39,39,42,19,27,16,31,33,22,33,34,28,32,32,24,32,32,14,14,31,13,49,32,32,34,32,23,26,24,31,30,46,32,31,29,33,33,32,21,20,19,36]}} 
				// return JSON.parse(jsonString);
			} else {
				jsonString += String.fromCharCode(imageData[i]) + String.fromCharCode(imageData[i + 1]) + String.fromCharCode(imageData[i + 2]);
			}
			i += 4;

			if (i > imageData.length) {
				run = false;
				console.log('Image JSON Decode Error!');
			}
		}
	},

	lineHeightModifier: function (val) {
		if (typeof(val) !== 'undefined') {
			this._lineHeightModifier = val;
		}
	},

	/**
	 * Returns the width in pixels of the text passed in the
	 * argument.
	 * @param {String} text The text to measure.
	 * @returns {number}
	 */
	measureTextWidth: function (text) {
		if (this._loaded) {
			var characterIndex,
				charCodeMap = this._charCodeMap,
				measuredWidthMap = this._measuredWidthMap,
				charIndex,
				lineArr = [],
				lineIndex,
				measuredWidth,
				maxWidth = 0;
			
			// Handle multi-line text
			if (text.indexOf('\n') > -1) {
				// Split each line into an array item
				lineArr = text.split('\n');
			} else {
				// Store the text as a single line
				lineArr.push(text);
			}

			for (lineIndex = 0; lineIndex < lineArr.length; lineIndex++) {
				// Calculate the total width of the line of text
				measuredWidth = 0;
				for (characterIndex = 0; characterIndex < lineArr[lineIndex].length; characterIndex++) {
					charIndex = charCodeMap[lineArr[lineIndex].charCodeAt(characterIndex)];
					measuredWidth += measuredWidthMap[charIndex] || 0;
				}
				
				if (measuredWidth > maxWidth) {
					maxWidth = measuredWidth;
				}
			}

			// Store the width of this line so we can align it correctly
			return measuredWidth;
		}
		
		return -1;
	},

	render: function (ctx, entity) {
		if (entity._renderText && this._loaded) {
			var _ctx = ctx,
				text = entity._renderText,
				lineText,
				lineArr = [],
				lineIndex,
				characterIndex,
				charCodeMap = this._charCodeMap,
				charPosMap = this._charPosMap,
				measuredWidthMap = this._measuredWidthMap,
				pixelWidthMap = this._pixelWidthMap,
				renderX = 0,
				renderY = 0,
				renderStartX = 0,
				renderStartY = 0,
				masterX = 0,
				masterY = 0,
				lineWidth = [],
				lineHeight = (this._sizeY - 2),
				singleLineWidth = 0,
				totalWidth = 0,
				totalHeight,
				charIndex;

			// Handle multi-line text
			if (text.indexOf('\n') > -1) {
				// Split each line into an array item
				lineArr = text.split('\n');
			} else {
				// Store the text as a single line
				lineArr.push(text);
			}

			totalHeight = (lineHeight * lineArr.length);

			// TODO: Y-based alignment doesn't work at the moment. Fix it!
			// Handle text alignment y
			switch (entity._textAlignY) {
				case 0: // Align top
					renderStartY = -((lineHeight * (lineArr.length)) / 2) - (entity._textLineSpacing * ((lineArr.length - 1) / 2));//0;
				break;

				case 1: // Align middle
					renderStartY = -((lineHeight * (lineArr.length)) / 2) - (entity._textLineSpacing * ((lineArr.length - 1) / 2));
				break;

				case 2: // Align bottom
					renderStartY = -((lineHeight * (lineArr.length)) / 2) - (entity._textLineSpacing * ((lineArr.length - 1) / 2));//-((lineHeight) * (lineArr.length)) - (entity._textLineSpacing * (lineArr.length - 1));
				break;
			}

			// Calculate the total text width of each line
			for (lineIndex = 0; lineIndex < lineArr.length; lineIndex++) {
				lineText = lineArr[lineIndex];
				for (characterIndex = 0; characterIndex < lineText.length; characterIndex++) {
					charIndex = charCodeMap[lineText.charCodeAt(characterIndex)];
					singleLineWidth += measuredWidthMap[charIndex] || 0;
				}

				// Store the width of this line so we can align it correctly
				lineWidth[lineIndex] = singleLineWidth;

				if (singleLineWidth > totalWidth) {
					totalWidth = singleLineWidth;
				}

				singleLineWidth = 0;
			}

			// Handle text cached alignment x
			switch (entity._textAlignX) {
				case 0: // Align left
					renderStartX = -entity._bounds2d.x2;
					break;

				case 1: // Align center
					renderStartX = -totalWidth / 2;
					break;

				case 2: // Align right
					renderStartX = entity._bounds2d.x2 -totalWidth;
					break;
			}

			/*_ctx.strokeStyle = '#ff0000';
			_ctx.strokeRect(renderStartX, renderStartY, totalWidth, totalHeight);*/

			for (lineIndex = 0; lineIndex < lineArr.length; lineIndex++) {
				lineText = lineArr[lineIndex];
				renderY = (lineHeight * lineIndex) + (entity._textLineSpacing * (lineIndex));

				// Handle text alignment x
				switch (entity._textAlignX) {
					case 0: // Align left
						renderX = -entity._bounds2d.x2;
					break;

					case 1: // Align center
						renderX = -lineWidth[lineIndex] / 2;
					break;

					case 2: // Align right
						renderX = entity._bounds2d.x2 -lineWidth[lineIndex];
					break;
				}

				for (characterIndex = 0; characterIndex < lineText.length; characterIndex++) {
					charIndex = charCodeMap[lineText.charCodeAt(characterIndex)];

					_ctx.drawImage(
						this.image,
						charPosMap[charIndex], // texture x
						2, // texture y
						pixelWidthMap[charIndex], // texture width
						this._sizeY - 2, // texture height
						Math.floor(masterX + renderX), // render x TODO: Performance - Cache these?
						Math.floor(masterY + renderStartY + renderY), // render y
						pixelWidthMap[charIndex], // render width
						(this._sizeY - 2) // render height
					);

					// Check if we should overlay with a colour
					if (entity._colorOverlay) {
						_ctx.save();
						// Set the composite operation and draw the colour over the top
						_ctx.globalCompositeOperation = 'source-atop';

						_ctx.fillStyle = entity._colorOverlay;
						_ctx.fillRect(
							Math.floor(masterX + renderX), // render x TODO: Performance - Cache these?
							Math.floor(masterY + renderStartY + renderY), // render y
							pixelWidthMap[charIndex], // render width
							(this._sizeY - 2) // render height
						);
						_ctx.restore();
					}

					renderX += measuredWidthMap[charIndex] || 0;

					ige._drawCount++;
				}

				renderX = 0;
			}
		}
	},

	destroy: function () {
		this.image = null;
		this.script = null;
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = IgeFontSheet; }
