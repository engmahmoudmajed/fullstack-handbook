import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/$')({
  component: RouteComponent,
})

function RouteComponent() {
  const { _splat } = Route.useParams()

  return <div>Any route you will go under this Route
    will render same page
    <p>{_splat}</p>
  </div>
}
