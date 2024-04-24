function getTargetElement(selector) {
	let target_selectors = selector.split(':parent');
	let default_selector = target_selectors[0];
	let element = document.querySelector(default_selector);
	if (!element)
		return null;
	while (target_selectors.length > 1) {
		target_selectors.shift();
		element = element.parentElement;
		if (!element) {
			console.warn('Parent not found for:', selector);
			return null;
		}
	}
	return element;
}

function getAllTargetElements(selector) {
	let target_selectors = selector.split(':parent');
	let default_selector = target_selectors[0];
	let elements = Array.from(document.querySelectorAll(default_selector));
	if (elements.length === 0)
		return [];
	while (target_selectors.length > 1) {
		target_selectors.shift();
		elements = elements.map(element => element.parentElement);
		// Check if any parent is null
		if (elements.includes(null)) {
			console.warn('Parent not found for:', selector);
			return [];
		}
	}
	return elements;
}

class CommandElement extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		const defer = this.getAttribute('defer') !== null;
		if (defer) {
			this.removeAttribute('defer');
		}
		if (defer) {
			setTimeout(() => this.init(), 0);
		} else {
			this.init();
		}
	}

	init() {
		if (this.hasAttribute('for')) {
			const target = getTargetElement(this.getAttribute('for'));
			if (!target) {
				console.error('Target not found:', this.getAttribute('for'));
				return;
			}
			this.removeAttribute('for');
			this.applyCommand(target);
		} else if (this.hasAttribute('for-all')) {
			const targets = getAllTargetElements(this.getAttribute('for-all'));
			if (targets.length === 0) {
				console.error('No targets found:', this.getAttribute('for-all'));
				return;
			}
			this.removeAttribute('for-all');
			for (const target of targets) {
				this.applyCommand(target);
			}
		} else {
			console.error('No target specified for command:', this, 'Use the "for" or "for-all" attribute');
		}
		console.log('Customization applied');
	}

	applyCommand(target) {
		for (const attribute of this.attributes) {
			switch (attribute.name) {
				case 'toc-collapse':
					makeTocCollapse(target.id);
					break;
				case 'center':
					target.style.textAlign = 'center';
					break;
				case 'right':
					target.style.textAlign = 'right';
					break;
				case 'bold':
					target.style.fontWeight = 'bold';
					break;
				case 'italic':
					target.style.fontStyle = 'italic';
					break;
				case 'underline':
					target.style.textDecoration = 'underline';
					break;
				case 'class':
					target.classList.add(attribute.value);
					break;
				case 'style':
					target.style.cssText += attribute.value;
					break;
				case 'remove-element':
					target.remove();
					break;
				default:
					console.error('Unknown command:', attribute.name);
					break;
			}
		}
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
