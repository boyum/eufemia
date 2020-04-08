/**
 * ATTENTION: This file is auto generated by using "prepareTemplates".
 * Do not change the content!
 *
 */

/**
 * Library Index template to autogenerate all the components and patterns
 * Used by "prepareTemplates"
 */

import { registerElement } from '../shared/component-helper'

// import all the aviable components
import ActionNav from './action-nav/ActionNav'
import DescriptionList from './description-list/DescriptionList'
import FieldsetDescription from './fieldset-description/FieldsetDescription'
import Footer from './footer/Footer'
import Form from './form/Form'
import FormSummary from './form-summary/FormSummary'
import Grid from './grid/Grid'
import MainNav from './main-nav/MainNav'
import RangeSlider from './range-slider/RangeSlider'
import SummaryTable from './summary-table/SummaryTable'
import ViewTitle from './view-title/ViewTitle'

// define / export all the aviable components
export {
  ActionNav,
  DescriptionList,
  FieldsetDescription,
  Footer,
  Form,
  FormSummary,
  Grid,
  MainNav,
  RangeSlider,
  SummaryTable,
  ViewTitle
}

export const getPatterns = () => {
  return {
    ActionNav,
    DescriptionList,
    FieldsetDescription,
    Footer,
    Form,
    FormSummary,
    Grid,
    MainNav,
    RangeSlider,
    SummaryTable,
    ViewTitle
  }
}

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true
  const components = getPatterns()
  // register this component to work with custom element
  for (const c in components) {
    if (components[c] && components[c].tagName) {
      registerElement(
        components[c].tagName,
        components[c],
        components[c].defaultProps
      )
    }
  }
}

export default {
  enableWebComponents
}
