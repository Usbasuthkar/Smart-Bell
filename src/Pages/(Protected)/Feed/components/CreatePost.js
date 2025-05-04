import React, { useState } from "react";
import "./CreatePost.css"

function CreatePost({ onPostCreate, userEmail }) {
    const [content, setContent] = useState("");
    const [projectType, setProjectType] = useState("funding"); // Default for clients, could be "investment" for investors
    const [expanded, setExpanded] = useState(false);
    
    // In a real application, this would be fetched based on the user's type
    const [userType, setUserType] = useState("client"); // or "investor"
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        
        onPostCreate({
            content,
            projectType
        });
        
        setContent("");
        setExpanded(false);
    };
    
    return (
        <div className="create-post-container">
            <form onSubmit={handleSubmit}>
                <div className="create-post-header">
                    <img src="/api/placeholder/40/40" alt="Avatar" className="create-post-avatar" />
                    <div 
                        className={`create-post-input ${expanded ? 'expanded' : ''}`}
                        onClick={() => setExpanded(true)}
                    >
                        {!expanded ? (
                            <div className="placeholder-text">
                                {userType === "investor" 
                                    ? "Share investment opportunities or insights..." 
                                    : "Share your project or funding needs..."
                                }
                            </div>
                        ) : (
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={userType === "investor" 
                                    ? "Share investment opportunities or insights..." 
                                    : "Share your project or funding needs..."
                                }
                                autoFocus
                                className="post-textarea"
                            />
                        )}
                    </div>
                </div>
                
                {expanded && (
                    <div className="create-post-expanded">
                        <div className="post-type-selector">
                            <label>Post Type:</label>
                            <select 
                                value={projectType}
                                onChange={(e) => setProjectType(e.target.value)}
                                className="post-type-select"
                            >
                                {userType === "client" ? (
                                    <option value="funding">Seeking Investment</option>
                                ) : (
                                    <option value="investment">Offering Investment</option>
                                )}
                                <option value="update">General Update</option>
                            </select>
                        </div>
                        
                        <div className="create-post-footer">
                            <div className="post-attachments">
                                <button type="button" className="attachment-btn">
                                    <i className="image-icon"></i>
                                    <span>Image</span>
                                </button>
                                <button type="button" className="attachment-btn">
                                    <i className="document-icon"></i>
                                    <span>Document</span>
                                </button>
                                <button type="button" className="attachment-btn">
                                    <i className="link-icon"></i>
                                    <span>Link</span>
                                </button>
                            </div>
                            
                            <div className="post-actions">
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => setExpanded(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="publish-btn"
                                    disabled={!content.trim()}
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default CreatePost;