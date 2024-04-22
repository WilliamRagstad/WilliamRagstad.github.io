function getTargetElement(command_selector) {
	let target_selectors = command_selector.split(':parent');
	let default_selector = target_selectors[0];
	let element = document.querySelector(default_selector);
	if (!element) {
		console.error('Element not found:', default_selector);
		return null;
	}
	while (target_selectors.length > 1) {
		let target_selector = target_selectors.shift();
		element = element.parentElement;
		if (!element) {
			console.error('Element not found:', target_selector);
			return null;
		}
	}
	return element;
}

function applyCustomization() {
	let appliedCustomization = false;
	for (const commandElement of document.querySelectorAll('command')) {
		let targetSelector = commandElement.getAttribute('for');
		if (!targetSelector) {
			console.error('No target specified for command:', commandElement);
			continue;
		}
		let targetElement = getTargetElement(targetSelector);
		if (targetElement) {
			commandElement.removeAttribute('for');
			for (const attribute of commandElement.attributes) {
				let prevApplied = appliedCustomization;
				appliedCustomization = true;
				switch (attribute.name) {
					case 'toc-collapse':
						makeTocCollapse(targetElement.id);
						break;
					case 'center':
						targetElement.style.textAlign = 'center';
						break;
					case 'right':
						targetElement.style.textAlign = 'right';
						break;
					case 'bold':
						targetElement.style.fontWeight = 'bold';
						break;
					case 'italic':
						targetElement.style.fontStyle = 'italic';
						break;
					case 'underline':
						targetElement.style.textDecoration = 'underline';
						break;
					case 'class':
						targetElement.classList.add(attribute.value);
						break;
					case 'style':
						targetElement.style.cssText += attribute.value;
						break;
					default:
						console.error('Unknown command:', attribute.name);
						appliedCustomization = prevApplied;
						break;
				}
			}
		} else {
			console.error('Target not found:', targetSelector);
			continue;
		}
		commandElement.remove();
	}
	if (appliedCustomization) console.log('Customization applied');
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
}

main();

// ========= Commands =========

function makeTocCollapse(header_id /* Node */) {
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
