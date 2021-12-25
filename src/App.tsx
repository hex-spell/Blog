//import { createPost, updatePost, deletePost } from './graphql/mutations';
import React, { useState } from "react";
import { PostWithoutContent, usePostsListWithoutContent } from "queries";

function App() {
  const [posts, setPosts] = useState<PostWithoutContent[] | null>(null);

  usePostsListWithoutContent({
    onSuccess: (posts) => setPosts(posts),
  });

  return <div className="App">{JSON.stringify(posts)}</div>;
}

export default App;
