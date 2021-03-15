import { onboarding } from './onboarding'

export type TemplateType = 'onboarding'

const templates: {
  [id in TemplateType]: IComponents
} = {
  onboarding,
}

export default templates
