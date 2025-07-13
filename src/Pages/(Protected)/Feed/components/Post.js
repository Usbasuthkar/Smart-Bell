import React, { useState } from "react";
import { formatDistanceToNow } from 'date-fns'; // You'll need to install this package
import "./Post.css"

function Post({ post, currentUserId }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([
        {
            id: 1,
            author: {
                name: "Alex Turner",
                avatar: "/api/placeholder/32/32"
            },
            text: "This looks promising! I'd be interested in learning more about your projections.",
            timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
            id: 2,
            author: {
                name: "Elena Diaz",
                avatar: "/api/placeholder/32/32"
            },
            text: "Have you considered expanding to European markets as well?",
            timestamp: new Date(Date.now() - 7200000).toISOString()
        }
    ]);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            author: {
                name: "You",
                avatar: "/api/placeholder/32/32"
            },
            text: commentText,
            timestamp: new Date().toISOString()
        };

        setComments([...comments, newComment]);
        setCommentText("");
    };

    const formattedTime = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
    
    const postTypeLabel = post.projectType === "funding" ? "Seeking Funding" : "Offering Investment";
    const authorTypeLabel = post.author.type === "investor" ? "Investor" : "Client";

    return (
        <div className="post-card">
            <div className="post-header">
                <img src={post.author.avatar} alt="Avatar" className="post-avatar" />
                <div className="post-author-info">
                    <h4>{post.author.name}</h4>
                    <div className="post-meta">
                        <span className={`author-type ${post.author.type}`}>{authorTypeLabel}</span>
                        <span className="post-time">{formattedTime}</span>
                    </div>
                </div>
                {post.projectType && (
                    <div className={`post-type-badge ${post.projectType}`}>
                        {postTypeLabel}
                    </div>
                )}
            </div>

            <div className="post-content">
                <p>{post.content}</p>
            </div>

            <div className="post-actions">
                <button 
                    className={`post-action-btn ${liked ? 'liked' : ''}`} 
                    onClick={handleLike}
                >
                    <i className={`like-icon ${liked ? 'liked' : ''}`}></i>
                    <span>{likes}</span>
                </button>
                <button 
                    className="post-action-btn" 
                    onClick={() => setShowComments(!showComments)}
                >
                    <i className="comment-icon"></i>
                    <span>{comments.length}</span>
                </button>
                <button className="post-action-btn">
                    <i className="share-icon"></i>
                    <span>Share</span>
                </button>
                {post.author.type === "client" && post.projectType === "funding" && (
                    <button className="invest-btn">
                        Contact for Investment
                    </button>
                )}
                {post.author.type === "investor" && post.projectType === "investment" && (
                    <button className="pitch-btn">
                        Submit Proposal
                    </button>
                )}
            </div>

            {showComments && (
                <div className="post-comments">
                    {comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <img src={comment.author.avatar} alt="" className="comment-avatar" />
                            <div className="comment-content">
                                <div className="comment-header">
                                    <h5>{comment.author.name}</h5>
                                    <span className="comment-time">
                                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                                    </span>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    <form className="comment-form" onSubmit={handleComment}>
                        <img src="/api/placeholder/32/32" alt="Your avatar" className="comment-avatar" />
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="comment-input"
                        />
                        <button type="submit" className="comment-submit">Post</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Post;