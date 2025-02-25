import React from 'react'
import { Field, Form, Iterate, Value, Wizard } from '../..'
import { Card } from '../../../../components'
import { Lead } from '../../../../elements'
import { Translation, translations } from './ChildrenWithAgeTranslations'
import type { SectionProps } from '../../Form/Section'

type Mode = 'edit' | 'summary'
type Variant = Array<'joint-responsibility' | 'daycare'>

export type Props = SectionProps & {
  mode?: Mode
  enableAdditionalQuestions?: Variant
  toWizardStep?: number
}

export default function ChildrenWithAge({
  mode,
  enableAdditionalQuestions,
  toWizardStep,
  ...props
}: Props) {
  return (
    <Form.Section translations={translations} required {...props}>
      {mode === 'summary' ? (
        <Summary toWizardStep={toWizardStep} />
      ) : (
        <EditContent
          enableAdditionalQuestions={enableAdditionalQuestions}
        />
      )}
    </Form.Section>
  )
}

function EditContent({ enableAdditionalQuestions }: Props) {
  const tr = Form.useTranslation<Translation>()

  return (
    <Card stack>
      <Lead>{tr.ChildrenWithAge.hasChildren.title}</Lead>

      <Field.Boolean
        path="/hasChildren"
        label={tr.ChildrenWithAge.hasChildren.fieldLabel}
        variant="buttons"
        defaultValue={false}
        errorMessages={{
          required: tr.ChildrenWithAge.hasChildren.required,
        }}
      />

      <Form.Visibility pathTrue="/hasChildren" animate>
        {enableAdditionalQuestions?.includes('joint-responsibility') && (
          <Field.Boolean
            path="/hasJointResponsibility"
            label={tr.ChildrenWithAge.hasJointResponsibility.fieldLabel}
            variant="buttons"
            defaultValue={false}
            errorMessages={{
              required: tr.ChildrenWithAge.hasChildren.required,
            }}
          />
        )}

        {enableAdditionalQuestions?.includes('daycare') && (
          <Field.Boolean
            path="/usesDaycare"
            label={tr.ChildrenWithAge.usesDaycare.fieldLabel}
            variant="buttons"
            defaultValue={false}
            errorMessages={{
              required: tr.ChildrenWithAge.usesDaycare.required,
            }}
          />
        )}

        <Field.Number
          path="/countChildren"
          label={tr.ChildrenWithAge.countChildren.fieldLabel}
          errorMessages={{
            minimum: tr.ChildrenWithAge.countChildren.required,
          }}
          width="small"
          defaultValue={1}
          minimum={1}
          maximum={20}
          showStepControls
          decimalLimit={0}
        />

        <Iterate.Array
          countPath="/countChildren"
          countPathTransform={transformAgeItem}
          countPathLimit={20}
          path="/children"
        >
          <Field.Composition
            label={tr.ChildrenWithAge.childrenAge.fieldLabel}
            align="center"
          >
            <Field.Number
              itemPath="/age"
              errorMessages={{
                required: tr.ChildrenWithAge.childrenAge.required,
              }}
              placeholder="0"
              width="small"
              minimum={0}
              maximum={17}
              decimalLimit={0}
            />

            <Form.Visibility pathTrue="/hasJointResponsibility">
              <Field.Boolean
                itemPath="/jointResponsibility"
                defaultValue={false}
                label={
                  tr.ChildrenWithAge.confirmJointResponsibility.fieldLabel
                }
              />
            </Form.Visibility>

            <Form.Visibility pathTrue="/usesDaycare">
              <Field.Boolean
                itemPath="/hasDaycare"
                defaultValue={false}
                label={tr.ChildrenWithAge.hasDaycare.fieldLabel}
              />
            </Form.Visibility>
          </Field.Composition>
        </Iterate.Array>
      </Form.Visibility>
    </Card>
  )
}

function Summary({ toWizardStep }: Props) {
  const tr = Form.useTranslation<Translation>()
  return (
    <Card stack>
      <Lead>{tr.ChildrenWithAge.hasChildren.title}</Lead>

      <Value.SummaryList>
        <Value.Number
          path="/countChildren"
          label={tr.ChildrenWithAge.countChildren.valueVale}
          defaultValue={0}
          suffix={tr.ChildrenWithAge.countChildren.suffix}
          maximum={20}
        />

        <Form.Visibility pathTrue="/hasChildren">
          <Iterate.Array path="/children">
            <Value.Composition
              label={tr.ChildrenWithAge.childrenAge.fieldLabel}
              gap={false}
            >
              <Value.Number
                itemPath="/age"
                suffix={tr.ChildrenWithAge.childrenAge.suffix}
                defaultValue="–"
              />

              <Form.Visibility pathTrue="/hasJointResponsibility">
                {', '}
                <Value.Boolean
                  inline
                  itemPath="/jointResponsibility"
                  trueText={tr.ChildrenWithAge.jointResponsibilityTrue}
                  falseText={tr.ChildrenWithAge.jointResponsibilityFalse}
                  defaultValue={false}
                />
              </Form.Visibility>

              <Form.Visibility pathTrue="/usesDaycare">
                {', '}
                <Value.Boolean
                  inline
                  itemPath="/hasDaycare"
                  trueText={tr.ChildrenWithAge.daycareTrue}
                  falseText={tr.ChildrenWithAge.daycareFalse}
                  defaultValue={false}
                />
              </Form.Visibility>
            </Value.Composition>
          </Iterate.Array>
        </Form.Visibility>
      </Value.SummaryList>

      {typeof toWizardStep === 'number' ? (
        <Wizard.EditButton toStep={toWizardStep} />
      ) : null}
    </Card>
  )
}

const transformAgeItem = ({ value }) =>
  Object.prototype.hasOwnProperty.call(value || {}, 'age')
    ? value
    : { age: undefined }

ChildrenWithAge._supportsSpacingProps = true
