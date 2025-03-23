# chip-view

## Properties

| name        | type       | Description                                                                                        |
| ----------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `type`      | `ChipType` | Determines the type of chip view to be rendered.                                                   |
| `selected`  | `boolean`  | Indicates whether the chip is selected or not.                                                     |
| `activated` | `boolean`  | Indicates whether the chip is activated or not.                                                    |
| `value`     | `string`   | Specifies the value to be shown as text in the chip.                                               |
| `disabled`  | `boolean`  | Indicates whether the chip is disabled or not.                                                     |
| `icon`      | `string`   | Specifies the material icon name to be shown as the leading icon in the chip. <br> Default: `done` |

### ChipType

| name     | description                                                                      |
| -------- | -------------------------------------------------------------------------------- |
| `filter` | represent filters for a collection. multiple choices                             |
| `choice` | choice chips represent a single selection.                                       |
| `input`  | represent information used in fields, such as an entity or different attributes. |

## Render Behaviour

- The default height of the chip view is 32px, and the icon is placed at the left side of the chip view.
- The chip view shows the value text in it and renders it as an outlined view.
- When type is set to `filter`, the selected chip shows the done icon at the left side along with the value text. When the chip is in an activated state, the view is updated accordingly.
