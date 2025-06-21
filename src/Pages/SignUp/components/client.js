import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Client({ goBack, email,name }) {
    const [clientData, setClientData] = useState({
        role: '',
        companyName: '',
        industry: '',
        otherIndustry: '',
        experienceLevel: '',
        otherlinks:[],
        linkedinProfile: '',
        referralCode: '',
        location: '',
        email: email,
        name:name,
        about:'',
        Portfolio:[],
        investments:0,
        connections:0,
        join_month:new Date().toLocaleString('default',{month:'long'}),
        join_year:new Date().getFullYear()
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
  const { name, value } = e.target;

    if (name === "otherlinks") {
        const linksArray = value.split(",").map(link => link.trim()).filter(link => link !== "");
        setClientData(prevState => ({
        ...prevState,
        [name]: linksArray,
        }));
    } else {
        setClientData(prevState => ({
        ...prevState,
         [name]: value,
        }));
    }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!clientData.role || !clientData.industry || !clientData.experienceLevel || !clientData.linkedinProfile) {
            alert("Please fill in all required fields.");
            return;
        }

        if (clientData.industry === "other" && !clientData.otherIndustry) {
            alert("Please specify the 'Other' industry.");
            return;
        }

        const finalIndustry = clientData.industry === "other" ? clientData.otherIndustry : clientData.industry;

        const finalClientData = {
            ...clientData,
            industry: finalIndustry, 
        };

        console.log('Client Data:', finalClientData);
        setLoading(true)
        try {
            await axios.post("https://smart-bell-server.onrender.com/ClientRegister", finalClientData);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <button onClick={goBack} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" color="black" />
                </button>
                <h1 style={{ marginRight: '16px', flex: 1, textAlign: 'center' }}>Create an account</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Role / Title</label>
                    <input
                        required
                        type="text"
                        name="role"
                        value={clientData.role}
                        onChange={handleChange}
                        placeholder="e.g., Founder, Student"
                    />
                </div>

                <div>
                    <label>Company / Startup Name</label>
                    <input
                        required
                        type="text"
                        name="companyName"
                        value={clientData.companyName}
                        onChange={handleChange}
                        placeholder="Optional, but helpful"
                    />
                </div>

                <div>
                    <label>Location</label>
                    <input
                        required
                        type="text"
                        name="location"
                        value={clientData.location}
                        onChange={handleChange}
                        placeholder="City and Country"
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <label>Industry / Field</label>
                    <select
                        style={{ fontSize: '0.7em' }}
                        required
                        name="industry"
                        value={clientData.industry}
                        onChange={handleChange}
                    >
                        <option value="">Select an industry</option>
                        <option value="tech">Tech</option>
                        <option value="health">Health</option>
                        <option value="finance">Finance</option>
                        <option value="realEstate">Real Estate</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {clientData.industry === "other" && (
                    <div>
                        <label>Specify Industry</label>
                        <input
                            required
                            type="text"
                            name="otherIndustry"
                            value={clientData.otherIndustry}
                            onChange={handleChange}
                            placeholder="Please specify your industry"
                        />
                    </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <label>Experience Level</label>
                    <select
                        style={{ fontSize: '0.7em' }}
                        required
                        name="experienceLevel"
                        value={clientData.experienceLevel}
                        onChange={handleChange}
                    >
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="experienced">Experienced</option>
                    </select>
                </div>

                <div>
                    <label>LinkedIn Profile URL</label>
                    <input
                        required
                        type="url"
                        name="linkedinProfile"
                        value={clientData.linkedinProfile}
                        onChange={handleChange}
                        placeholder="LinkedIn Profile URL"
                    />
                </div>

                <div>
                    <label>Additional Links</label>
                    <input
                    type="text"
                    name="otherlinks"
                    value={clientData.otherlinks.join(", ")}
                    onChange={handleChange}
                    placeholder="e.g., https://github.com, https://your-portfolio.com"/>
                </div>

                <div>
                    <label>Referral Code (Optional)</label>
                    <input
                        type="text"
                        name="referralCode"
                        value={clientData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter referral code (if any)"
                    />
                </div>

                <div>
                <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                &nbsp;Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
                </div>
            </form>
        </div>
    );
}
