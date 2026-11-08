import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div> File route </div>
}
