import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form, Field } from '../../..'
import { Provider } from '../../../../../shared'

describe('Value.Number', () => {
  it('renders value', () => {
    render(<Value.Number value={42} />)
    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('42')
  })

  it('renders label when showEmpty is true', () => {
    const { rerender } = render(
      <Value.Number label="Number label" showEmpty />
    )
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Number label'
    )

    rerender(<Value.Number label="Number label" />)
    expect(document.querySelector('.dnb-form-label')).toBeNull()
  })

  it('renders value and label', () => {
    render(<Value.Number label="Label" value={42} />)
    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('42')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Label'
    )
  })

  it('renders given minimum value', () => {
    render(<Value.Number value={10} minimum={20} />)
    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('20')
  })

  it('renders given maximum value', () => {
    render(<Value.Number value={20} maximum={10} />)
    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('10')
  })

  it('renders placeholder', () => {
    render(<Value.Number placeholder="Enter some number" />)
    expect(screen.getByText('Enter some number')).toBeInTheDocument()
  })

  it('formats number', () => {
    render(<Value.Number value={-12345678} />)

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('-12 345 678')
  })

  it('renders gets value based on path', () => {
    render(
      <Form.Handler data={{ myNumber: 1234 }}>
        <Value.Number path="/myNumber" />
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('1 234')
  })

  it('formats with percent', () => {
    render(<Value.Number value={-12345} percent />)

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('−12 345 %')
  })

  it('should render value={0} with prefix and suffix', () => {
    render(<Value.Number value={0} prefix="prefix" suffix="suffix" />)

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('prefix 0 suffix')
  })

  it('should not render when value is undefined', () => {
    render(<Value.Number value={undefined} />)

    expect(document.querySelector('.dnb-forms-value-number')).toBeNull()
  })

  it('should render – when value is undefined and showEmpty is true', () => {
    render(<Value.Number value={undefined} showEmpty suffix="suffix" />)

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('– suffix')
  })

  it('formats with percent and decimals', () => {
    render(<Value.Number value={-12345.6789} percent decimals={2} />)

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('−12 345,68 %')
  })

  it('formats with currency and currencyDisplay', () => {
    render(
      <Value.Number
        value={-12345.6789}
        currency
        currencyPosition="before"
        currencyDisplay="code"
      />
    )

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('NOK -12 345,68')
  })

  it('formats currency with aria version', () => {
    render(
      <Value.Number
        value={-12345.6789}
        currency
        currencyPosition="before"
        currencyDisplay="code"
      />
    )

    expect(
      document
        .querySelector('.dnb-number-format .dnb-sr-only')
        .getAttribute('data-text')
    ).toBe('-12 345,68 kroner')
  })

  it('formats with different locale', () => {
    const { rerender } = render(
      <Provider locale="en-GB">
        <Value.Number
          value={-12345.6789}
          currency
          currencyPosition="before"
          currencyDisplay="name"
        />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('kroner -12 345.68')
    expect(
      document
        .querySelector('.dnb-number-format .dnb-sr-only')
        .getAttribute('data-text')
    ).toBe('-12 345.68 kroner')

    rerender(
      <Provider locale="en-GB">
        <Value.Number
          value={-12345.6789}
          currency="SEK"
          currencyPosition="before"
          currencyDisplay="name"
        />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-forms-value-number')
    ).toHaveTextContent('Swedish kronor -12 345.68')
    expect(
      document
        .querySelector('.dnb-number-format .dnb-sr-only')
        .getAttribute('data-text')
    ).toBe('-12 345.68 Swedish kronor')
  })

  describe('inheritLabel', () => {
    it('renders label from field with same path', () => {
      render(
        <Form.Handler
          data={{
            myPath: 123,
          }}
        >
          <Field.Number path="/myPath" label="The label" />
          <Value.Number path="/myPath" inheritLabel />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-number')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-number')
      ).toHaveTextContent('The label')
    })
  })
})
