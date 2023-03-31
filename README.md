# dw-chip-select

Chips are compact elements that represent an input, attribute, or action.

## Description

- The Chip Select component is a block element.
- The Chip Select component displays compact elements representing input, attribute, or action.
- It has three types: `filter`, `choice`, and `input`
- `Filter` type allows multiple selection and renders chips in filter-style
- `Choice` type allows single selection and renders chips in choice-style
- `Input` type allows multiple selection and is used when there are many options

## Properties

The Chip Select component has the following properties:

| name                | type                      | Description                                                                                                                                                                                       |
| ------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`              | `FilterType`              | This is the type of the chip. The default value is `filter`.                                                                                                                                      |
| `value`             | [`object[]`](#filtertype) | When the type is `filter`, the value data type is an array of objects. When the type is `choice`, the value data type is an object.                                                               |
| `items`             | `object[]`                | This is a list of selectable items.                                                                                                                                                               |
| `valueTextProvider` | `() → string`             | This function returns a string and provides the value that represents the chip item.                                                                                                              |
| `valueProvider`     | `undefined`               | This function provides the value.                                                                                                                                                                 |
| `valueExpression`   | `string`                  | This provides a value based on the input received from the valueExpression key.                                                                                                                   |
| `name`              | `string`                  | This sets the name attribute on the internal input. The name property should only be used for browser autofill as webcomponent form participation does not currently consider the name attribute. |
| `label`             | `string`                  | This sets the label string and shows the label at the top of the chips.                                                                                                                           |

### FilterType

| name     | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| `filter` | it allows multiple selection and the chip is rendered in filter-style.      |
| `choice` | it allows single selection and the chip is rendered in choice-style.        |
| `input`  | it allows multiple selection and is used when available options are larger. |

## Render Behavior

- The Chip Select component renders the label at the top of the chips using the label property.
- It renders the chips using the items property and renders the chip view using the repeat directive in a flex box with flex-wrap: wrap.
- If the items property is undefined or not set, then the label and two shimmer chips are shown.

## Keyboard Accessibility

- Tab: Focus traversal from one component to another.
- Arrow Key: Focus traversal between chips within components.
- Left & Up arrow keys: Focus Next
- Right & Bottom arrow keys: Focus Previous
- Enter & Space: Selection toggle with ripple effect.

## Events

| name     | detail  | Description                                                                                            |
| -------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `change` | `value` | when the user interacts with the `chip` (select toggle). The details `value` is provided in the event. |
