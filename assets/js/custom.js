function isCommandTag(node /* Node */) {
	return node.nodeType === Node.COMMENT_NODE && node.nodeValue.startsWith('&') && node.nodeValue.endsWith('&');
}

function closestCommandTag(element /* Node */) {
	// Check neighboring nodes
	let prev = element.previousSibling;
	let next = element.nextSibling;
	while (prev && prev.nodeType === Node.TEXT_NODE && prev.nodeValue.trim() === '') {
		prev = prev.previousSibling;
	}
	while (next && next.nodeType === Node.TEXT_NODE && next.nodeValue.trim() === '') {
		next = next.nextSibling;
	}
	if (prev && isCommandTag(prev)) {
		return prev;
	}
	if (next && isCommandTag(next)) {
		return next;
	}
	// Check child nodes
	let children = Array.from(element.childNodes);
	if (children.length > 0) {
		return children.find(isCommandTag);
	}
	return null;
}

function applyHeaderCustomization() {
	const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	for (const header of headers) {
		let comment = closestCommandTag(header);
		if (comment) {
			let commands = comment.nodeValue.slice(1, -1).split(',').map((x) => x.trim());
			for (const command of commands) {
				console.log('Command:', command);
				switch (command) {
					case 'toc-collapse':
						makeTocCollapse(header);
						break;
					case 'center':
						header.style.textAlign = 'center';
						break;
					case 'right':
						header.style.textAlign = 'right';
						break;
					case 'bold':
						header.style.fontWeight = 'bold';
						break;
					case 'italic':
						header.style.fontStyle = 'italic';
						break;
					case 'underline':
						header.style.textDecoration = 'underline';
						break;
				}
			}
		}
	}
}

function applyCustomization() {
	applyHeaderCustomization();
}

function main() {
	let body_observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.addedNodes.length > 0) {
				applyCustomization();
			}
		});
	});
	body_observer.observe(document.body, { childList: true, subtree: true });
	applyCustomization();
	console.log('Customization applied');
}

main();

// ========= Commands =========

function makeTocCollapse(header /* Node */) {
	const header_id = header.querySelector(".anchor").id;
	const toc_link = document.querySelector(`.toc li > a[href="#${header_id}"]`);
	const toc_item = toc_link.parentElement;
	const toc_sublist = toc_item.querySelector("ul");
	// Wrap in a details element with a summary
	const details = document.createElement("details");
	const summary = document.createElement("summary");
	// move the link to the summary element
	summary.appendChild(toc_link);
	// Add the summary to the details element
	details.appendChild(summary);
	// Move the sublist to the details element
	details.appendChild(toc_sublist);
	toc_item.appendChild(details);
}
