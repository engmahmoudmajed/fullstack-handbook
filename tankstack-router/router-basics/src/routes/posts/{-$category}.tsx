// src/routes/posts/{-$category}.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/{-$category}')({
  component: PostsComponent,
})

function PostsComponent() {
  const { category } = Route.useParams()

  return (
    <div>
      <h1>{category ? `Posts in ${category}` : 'All Posts'}</h1>
    </div>
  )
}