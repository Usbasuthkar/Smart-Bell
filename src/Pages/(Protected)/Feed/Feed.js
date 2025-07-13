import React, { useState, useEffect } from "react";
import Header from "../../../Components/Header";
import { useParams } from "react-router-dom";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import FilterBar from "./components/FilterBar";
import "./styles/Feed.css";

export default function Feed() {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    // Mock data - in a real application, this would be fetched from your API
    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setPosts([
                {
                    id: 1,
                    author: {
                        name: "Sarah Johnson",
                        email: "sarah@example.com",
                        avatar: "/api/placeholder/40/40",
                        type: "investor"
                    },
                    content: "Looking for innovative tech startups in the renewable energy sector. Budget range $50K-$200K for initial investment.",
                    timestamp: "2025-04-20T10:30:00",
                    likes: 24,
                    comments: 8,
                    projectType: "investment"
                },
                {
                    id: 2,
                    author: {
                        name: "TechGrow Inc.",
                        email: "projects@techgrow.com",
                        avatar: "/api/placeholder/40/40",
                        type: "client"
                    },
                    content: "Our AI-driven agricultural monitoring solution is seeking $150K in funding to complete development and begin market testing. Projected ROI of 30% within 18 months.",
                    timestamp: "2025-04-19T15:45:00",
                    likes: 37,
                    comments: 15,
                    projectType: "funding"
                },
                {
                    id: 3,
                    author: {
                        name: "Michael Roberts",
                        email: "m.roberts@investgroup.com",
                        avatar: "/api/placeholder/40/40",
                        type: "investor"
                    },
                    content: "After 5 successful investments in the healthcare space, I'm expanding my portfolio to include fintech solutions. Interested in connecting with founders building payment infrastructure for emerging markets.",
                    timestamp: "2025-04-18T09:15:00",
                    likes: 42,
                    comments: 11,
                    projectType: "investment"
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handlePostCreate = (newPost) => {
        setPosts([
            {
                id: Date.now(),
                author: {
                    name: "Current User",
                    email: 'email',
                    avatar: "/api/placeholder/40/40",
                    type: "client" // This would be dynamically determined based on the logged-in user
                },
                timestamp: new Date().toISOString(),
                likes: 0,
                comments: 0,
                ...newPost
            },
            ...posts
        ]);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const filteredPosts = filter === "all" 
        ? posts 
        : posts.filter(post => post.projectType === filter || post.author.type === filter);

    return (
        <div className="feed-container">
            <Header id={id}/>
            <div className="feed-content">
                <div className="feed-main">
                    <CreatePost onPostCreate={handlePostCreate} userId={id} />
                    <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading posts...</p>
                        </div>
                    ) : (
                        <PostList posts={filteredPosts} userId={id} />
                    )}
                </div>
                <div className="feed-sidebar">
                    <div className="trending-section">
                        <h3>Trending Investments</h3>
                        <ul className="trending-list">
                            <li><span className="trending-tag">#RenewableEnergy</span> - 34 new projects</li>
                            <li><span className="trending-tag">#Biotech</span> - 28 new projects</li>
                            <li><span className="trending-tag">#AI</span> - 52 new projects</li>
                            <li><span className="trending-tag">#Fintech</span> - 19 new projects</li>
                        </ul>
                    </div>
                    <div className="suggestions-section">
                        <h3>Suggested Connections</h3>
                        <div className="suggestion-item">
                            <img src="/api/placeholder/40/40" alt="Avatar" className="suggestion-avatar" />
                            <div className="suggestion-info">
                                <h4>David Chen</h4>
                                <p>Angel Investor • Tech</p>
                            </div>
                            <button className="connect-btn">Connect</button>
                        </div>
                        <div className="suggestion-item">
                            <img src="/api/placeholder/40/40" alt="Avatar" className="suggestion-avatar" />
                            <div className="suggestion-info">
                                <h4>EcoSolutions</h4>
                                <p>Client • Sustainability</p>
                            </div>
                            <button className="connect-btn">Connect</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}