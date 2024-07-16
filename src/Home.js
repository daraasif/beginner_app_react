import Feed from "./Feed"

const Home = ({ posts, fetchError, isLoading }) => {

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg" color="green"> Loading Posts...</p>}
      {fetchError && <p className="statusMsg" color="red"> Error fetching posts...</p>}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className="statusMsg">No Posts To Display</p> )}

    </main>
  )
}

export default Home