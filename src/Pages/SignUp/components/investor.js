import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {Server_uri} from '../../../url'
import { useNavigate } from "react-router-dom";

export default function Investor({ id,goBack, email,name }) {
    const [investorData, setInvestorData] = useState({
        id,
        investorType: '',
        investmentRange: '',
        industries: [],
        location: '',
        linkedinProfile: '',
        otherlinks:[],
        accreditation: null,
        termsAccepted: false,
        investmentExperience: '',
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
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setInvestorData(prevState => ({
                ...prevState,
                [name]: checked,
            }));
        } else if (name === 'industries') {
            const updatedIndustries = value.split(',');
            setInvestorData(prevState => ({
                ...prevState,
                industries: updatedIndustries,
            }));
        }
        else if (name === "otherlinks") {
        const linksArray = value.split(",").map(link => link.trim()).filter(link => link !== "");
        setInvestorData(prevState => ({
        ...prevState,
        [name]: linksArray,
        })); }
        else {
            setInvestorData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e) => {
        setInvestorData(prevState => ({
            ...prevState,
            accreditation: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!investorData.termsAccepted) {
          alert('Please accept the terms and conditions to proceed.');
          return;
        }
    
        setLoading(true);
        try {
          await axios.post(`${Server_uri}/InvestorRegister`, investorData,
          );
          navigate("/login");

        } catch (error) {
          alert(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
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
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <label>Investor Type</label>
                    <select
                        required
                        name="investorType"
                        value={investorData.investorType}
                        onChange={handleChange}
                    >
                        <option value="">Select type of investor</option>
                        <option value="angel">Angel Investor</option>
                        <option value="vc">VC</option>
                        <option value="privateEquity">Private Equity</option>
                        <option value="corporate">Corporate</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Preferred Investment Range</label>
                    <input
                        required
                        type="text"
                        name="investmentRange"
                        value={investorData.investmentRange}
                        onChange={handleChange}
                        placeholder="e.g., <$10K, $10K–$100K, $100K+"
                    />
                </div>

                <div>
                    <label>Industries of Interest</label>
                    <input
                        required
                        type="text"
                        name="industries"
                        value={investorData.industries.join(',')}
                        onChange={handleChange}
                        placeholder="Tech, Health, Finance, Real Estate, etc."
                    />
                </div>

                <div>
                    <label>Location</label>
                    <input
                        required
                        type="text"
                        name="location"
                        value={investorData.location}
                        onChange={handleChange}
                        placeholder="City and Country"
                    />
                </div>

                <div>
                    <label>LinkedIn Profile URL</label>
                    <input
                        required
                        type="url"
                        name="linkedinProfile"
                        value={investorData.linkedinProfile}
                        onChange={handleChange}
                        placeholder="LinkedIn Profile URL"
                    />
                </div>
                
                <div>
                    <label>Additional Links</label>
                    <input
                        type="url"
                        name="otherlinks"
                        value={investorData.otherlinks.join(", ")}
                        onChange={handleChange}
                        placeholder="e.g- https://github.com, https://your-portfolio.com, https://your-company-name.com"
                    />
                </div>

                <div>
                    <label>Accreditation or Verification Document Upload</label>
                    <input
                        required
                        type="file"
                        name="accreditation"
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <label>Investment Experience</label>
                    <input
                        required
                        name="investmentExperience"
                        value={investorData.investmentExperience}
                        onChange={handleChange}
                        placeholder="Number of deals, years of investing, notable startups backed"
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '8px', gap: '20px' }}>
                    <div>
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={investorData.termsAccepted}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <label>I agree to the Terms & Conditions</label>
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
