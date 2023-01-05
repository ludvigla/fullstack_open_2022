import Notification from './Notification'

const Home = () => {
  return (
    <div>
      <Notification />
      <p>
        This is a blog app. You can create new blogs, like blogs, and comment on
        blogs.
      </p>
      <p>
        Log in with username: <strong>jdoe</strong> and password:{' '}
        <strong>password</strong> to see the create new blog posts.
      </p>
    </div>
  )
}

export default Home
