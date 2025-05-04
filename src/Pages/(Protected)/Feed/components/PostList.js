import React from "react";
import Post from "./Post";
import "./PostList.css"

function PostList({ posts, userEmail }) {
    if (posts.length === 0) {
        return (
            <div className="no-posts">
                <h3>No posts to display</h3>
                <p>Adjust your filters or be the first to create a post!</p>
            </div>
        );
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <Post key={post.id} post={post} currentUserEmail={userEmail} />
            ))}
        </div>
    );
}

export default PostList;