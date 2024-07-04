// Here I will fetch the posts from the server, which is getting the posts from the database

export default function Posts() {
  // we need state to save the values of posts
  // we need useEffect to fetch the data
  // useEffect(() => {
  //we need a function to get the posts
  // this function is async and uses fetch
  // once you fetch the data, you will set the state variable to be the posts data
  // }, [])
  // DECESION: you can have a separate function to get the posts, and call the function in the useEffect hookl or you can write the function directly in the useEffect hook
  return (
    <div>
      <h1>Posts</h1>
      {/* I will fetch the posts here */}
      {/* I will map over the posts and display them here */}
      {/* Conditional rendering idea: you can have a list of titles ............. */}
    </div>
  );
}
