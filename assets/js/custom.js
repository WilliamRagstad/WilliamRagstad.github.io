function getTargetElement(command_selector) {
	let target_selectors = command_selector.split(':parent');
	let default_selector = target_selectors[0];
	let element = document.querySelector(default_selector);
	if (!element)
		return null;
	while (target_selectors.length > 1) {
		target_selectors.shift();
		element = element.parentElement;
		if (!element)
			return null;
	}
	return element;
}

class CommandElement extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		let target_selector = this.getAttribute('for');
		if (!target_selector) {
			console.error('No target specified for command:', this);
			return;
		}
		let target_element = getTargetElement(target_selector);
		if (!target_element) {
			console.error('Target not found:', target_selector);
			return;
		}
		this.removeAttribute('for');
		for (const attribute of this.attributes) {
			switch (attribute.name) {
				case 'toc-collapse':
					makeTocCollapse(target_element.id);
					break;
				case 'center':
					target_element.style.textAlign = 'center';
					break;
				case 'right':
					target_element.style.textAlign = 'right';
					break;
				case 'bold':
					target_element.style.fontWeight = 'bold';
					break;
				case 'italic':
					target_element.style.fontStyle = 'italic';
					break;
				case 'underline':
					target_element.style.textDecoration = 'underline';
					break;
				case 'class':
					target_element.classList.add(attribute.value);
					break;
				case 'style':
					target_element.style.cssText += attribute.value;
					break;
				default:
					console.error('Unknown command:', attribute.name);
					break;
			}
		}
		console.log('Customization applied');
	}
}

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

// Register the custom element
customElements.define('command-', CommandElement);
