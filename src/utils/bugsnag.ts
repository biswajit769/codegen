import React from 'react'
import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'

export const bugsnagClient = bugsnag({
  apiKey: '12345' as string,
  releaseStage: process.env.NODE_ENV,
  notifyReleaseStages: ['production'],
})
bugsnagClient.use(bugsnagReact, React)

export const ErrorBoundary = bugsnagClient.getPlugin('react')
