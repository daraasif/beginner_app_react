import { Link } from "react-router-dom"

const Missing = () => {
    return (
      <main className="Missing">
        <h2>Page not found</h2>
        <p>Sorry, we can't find that page.</p>
        <Link to="/">Go Home</Link>
      </main>
    )
  }
  
  export default Missing