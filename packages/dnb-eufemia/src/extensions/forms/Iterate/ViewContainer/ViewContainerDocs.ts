import { PropertiesTableProps } from '../../../../shared/types'

export const ViewContainerProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the container.',
    type: 'React.Node',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the variant of the container. Can be `outline` or `basic`. Defaults to `outline`.',
    type: 'string',
    status: 'optional',
  },
  toolbar: {
    doc: 'An alternative toolbar to be shown in the container.',
    type: 'React.Node',
    status: 'optional',
  },
  '[FlexVertical](/uilib/layout/flex/container/)': {
    doc: 'All Flex.Vertical properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const ViewContainerEvents: PropertiesTableProps = {}
