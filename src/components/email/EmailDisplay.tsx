import React, { useState } from "react";
import styles from "./emaildisplay.module.css";
import EmailDropzone from "./EmailDropzone";

interface AnalysisResult {
  score: number;
  risk: string;
  reasons: string[];
  summary: string;
  recommendations: string[];
}

const EmailDisplay: React.FC = () => {
  const [emailText, setEmailText] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!emailText.trim()) {
      alert("Please provide an email to analyze");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const lambdaEndpoint = process.env.NEXT_PUBLIC_EMAIL_LAMBDA_ENDPOINT;
      if (!lambdaEndpoint) {
        throw new Error("Lambda endpoint not configured");
      }
      
      const response = await fetch(lambdaEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailText })
      });
    
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || `Server error: ${response.status}`);
      }
    
      const data = await response.json();
      
      if (!data || typeof data.score !== 'number' || !data.risk || !Array.isArray(data.reasons) || !data.summary || !Array.isArray(data.recommendations)) {
        throw new Error("Invalid response format from server");
      }
      
      setAnalysisResult(data);
      setShowValidation(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while analyzing the email.";
      setError(errorMessage);
      setShowValidation(true);
    } finally {
      setIsLoading(false);
    }
  };

  const extractEmailSubject = (content: string): string => {
    const subjectMatch = content.match(/^Subject:\s*(.+)$/m);
    return subjectMatch ? subjectMatch[1].trim() : "Unknown Subject";
  };

  const handleFileContent = (content: string) => {
    setEmailText(content);
    setEmailSubject(extractEmailSubject(content));
    setError(null);
  };

  const getRiskColor = (risk: string) => {
    const colors = { high: '#ff4444', medium: '#ffaa00', low: '#44ff44' };
    return colors[risk.toLowerCase() as keyof typeof colors] || '#ffffff';
  };

  return (
    <div className={`${styles.centeredContainer} ${showValidation ? styles.hasValidation : ''}`}>
      <div className={styles.emailInputSection}>
        <div className={styles.dropzoneContainer}>
          <EmailDropzone onFileContent={handleFileContent} />
        </div>
        
        {emailText && (
          <div className={styles.fileInfo}>
            <p>Email content loaded successfully!</p>
            <p className={styles.emailSubject}>
              Subject: {emailSubject.length > 60 ? emailSubject.substring(0, 60) + "..." : emailSubject}
            </p>
            <button 
              className={styles.verifyButton} 
              onClick={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Verify Email"}
            </button>
          </div>
        )}
      </div>
      
      {showValidation && (
        <div className={styles.validationBox}>
          <div className={styles.validationContent}>
            {error ? (
              <div className={styles.errorMessage}>{error}</div>
            ) : analysisResult ? (
              <div className={styles.analysisResults}>
                <div className={styles.scoreSection}>
                  <h3>Analysis Results</h3>
                  <div className={styles.score}>
                    Score: <span style={{ color: getRiskColor(analysisResult.risk) }}>
                      {analysisResult.score}%
                    </span>
                  </div>
                  <div className={styles.risk}>
                    Risk Level: <span style={{ color: getRiskColor(analysisResult.risk) }}>
                      {analysisResult.risk}
                    </span>
                  </div>
                </div>
                
                {analysisResult.summary && (
                  <div className={styles.summarySection}>
                    <h4>Summary:</h4>
                    <p className={styles.summaryText}>{analysisResult.summary}</p>
                  </div>
                )}
                
                {analysisResult.reasons.length > 0 && (
                  <div className={styles.reasonsSection}>
                    <h4>Key Findings:</h4>
                    <ul className={styles.reasonsList}>
                      {analysisResult.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResult.recommendations.length > 0 && (
                  <div className={styles.recommendationsSection}>
                    <h4>Recommendations:</h4>
                    <ul className={styles.recommendationsList}>
                      {analysisResult.recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>500: Internal Server Error</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailDisplay;
