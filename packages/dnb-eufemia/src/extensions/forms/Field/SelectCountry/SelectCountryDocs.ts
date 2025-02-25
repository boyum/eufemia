import { PropertiesTableProps } from '../../../../shared/types'
import { getFieldEventsWithTypes } from '../FieldDocs'

export const SelectCountryProperties: PropertiesTableProps = {
  countries: {
    doc: 'List only a certain set of countries: `Scandinavia`, `Nordic`, `Europe` or `Prioritized`(all countries [sorted by priority](/uilib/extensions/forms/feature-fields/SelectCountry/#filter-or-prioritize-country-listing)). Defaults to `Prioritized`.',
    type: 'string',
    status: 'optional',
  },
}

export const SelectCountryGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object', optional: true }
)
