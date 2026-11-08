import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/about')({
  component: () => <h1>About us</h1>,
})