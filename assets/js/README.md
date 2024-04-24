# Documentation

The `command-` element is used to apply customizations to the target element(s).
It can be used to apply multiple customizations at once.

## Attributes

- `for`: The selector of the target element. The customization will be applied to this element.
- `for-all`: The selector of the target elements. The customization will be applied to all these elements.
- `defer`: The customization will be applied after the page is loaded.

## Commands

- `toc-collapse`: Converts the target header into a collapsible section in the table of contents.
- `center`: Aligns the text to the center.
- `right`: Aligns the text to the right.
- `bold`: Makes the text bold.
- `italic`: Makes the text italic.
- `underline`: Underlines the text.
- `class`: Adds the class to the target element.
- `style`: Adds the style to the target element.
- `remove-element`: Removes the target element.

## Usage

```html
<command- for=".content h1#properties" bold italic style="color: red;"/>
<command- for-all=".content p" center/>
<command- for=".content h2#intro" toc-collapse/>
```

## Notes

- The `for` and `for-all` attributes are mutually exclusive.
- The `defer` attribute is optional.
- The `style` attribute should be a valid CSS style string.
- The `class` attribute should be a valid class name.
- The `toc-collapse` command requires the table of contents to be generated.
- The `toc-collapse` command should be used with header elements only.
- The `toc-collapse` command should be used with unique header IDs only.
- The `remove-element` command should be used with caution and will remove the target element completely.
