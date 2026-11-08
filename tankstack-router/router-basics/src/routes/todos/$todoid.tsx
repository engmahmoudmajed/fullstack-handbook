import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/$todoid')({
  component: RouteComponent,
})

function RouteComponent() {
  // we use useparam method to get param todoid 
  const { todoid } = Route.useParams()
  return <div>
    <h1>Page id : {todoid}</h1>
    Hello "/todos/$todoid"!
  </div>
}
