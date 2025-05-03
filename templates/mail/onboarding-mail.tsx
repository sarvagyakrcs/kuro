import { PROJECT_NAME } from "@/metadata";

export const onboardingmail = (confirmLink: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${PROJECT_NAME}</title>
  <style>
    /* Base styles */
    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f7fa;
    }
    
    /* Container setup */
    .email-wrapper {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    /* Header section */
    .header {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
      border-radius: 12px 12px 0 0;
    }
    
    .logo {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 700;
    }
    
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    
    /* Content section */
    .content {
      padding: 40px 30px;
      background-color: #ffffff;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
    }
    
    .welcome-message {
      margin-bottom: 25px;
      font-size: 16px;
      color: #374151;
    }
    
    /* Button styles */
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    
    .button {
      display: inline-block;
      background: linear-gradient(to right, #6366f1, #8b5cf6);
      color: #ffffff;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
      transition: all 0.2s ease;
    }
    
    .button:hover {
      background: linear-gradient(to right, #4f46e5, #7c3aed);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
    }
    
    /* Features section */
    .features {
      display: flex;
      justify-content: space-between;
      margin: 35px 0;
      flex-wrap: wrap;
    }
    
    .feature {
      flex: 1;
      min-width: 150px;
      margin: 10px;
      text-align: center;
      padding: 15px;
      background-color: #f9fafb;
      border-radius: 8px;
    }
    
    .feature-icon {
      font-size: 24px;
      margin-bottom: 12px;
      color: #6366f1;
    }
    
    .feature-title {
      font-weight: 600;
      margin-bottom: 8px;
      color: #111827;
    }
    
    .feature-text {
      font-size: 14px;
      color: #6b7280;
    }
    
    /* Notice section */
    .notice {
      background-color: #f3f4f6;
      padding: 15px 20px;
      border-radius: 6px;
      margin: 30px 0;
      color: #4b5563;
      font-size: 14px;
    }
    
    /* Footer section */
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      border-top: 1px solid #e5e7eb;
      border-radius: 0 0 12px 12px;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .social-links {
      margin: 20px 0;
    }
    
    .social-icon {
      display: inline-block;
      margin: 0 10px;
      color: #6366f1;
      text-decoration: none;
    }
    
    .footer-links {
      margin-top: 15px;
    }
    
    .footer-link {
      color: #6366f1;
      text-decoration: none;
      margin: 0 8px;
    }
    
    /* Responsive adjustments */
    @media only screen and (max-width: 600px) {
      .header {
        padding: 30px 20px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .features {
        flex-direction: column;
      }
      
      .feature {
        margin-bottom: 15px;
      }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body, html {
        background-color: #1f2937;
        color: #f3f4f6;
      }
      
      .email-wrapper {
        background-color: #111827;
      }
      
      .content {
        background-color: #111827;
        border-color: #374151;
        color: #f3f4f6;
      }
      
      .welcome-message {
        color: #e5e7eb;
      }
      
      .feature {
        background-color: #1f2937;
      }
      
      .feature-title {
        color: #f9fafb;
      }
      
      .feature-text {
        color: #d1d5db;
      }
      
      .notice {
        background-color: #374151;
        color: #d1d5db;
      }
      
      .footer {
        background-color: #1f2937;
        color: #9ca3af;
        border-color: #374151;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="logo">✨ ${PROJECT_NAME}</div>
      <h1>Welcome to Your AI Learning Journey</h1>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <p class="welcome-message">
        Thank you for joining ${PROJECT_NAME}! We're excited to help you create and manage AI-powered educational courses. To get started, please confirm your email address.
      </p>
      
      <!-- CTA Button -->
      <div class="button-container">
        <a href="${confirmLink}" class="button">Confirm My Email</a>
      </div>
      
      <!-- Features -->
      <div class="features">
        <div class="feature">
          <div class="feature-icon">🧠</div>
          <div class="feature-title">AI-Powered</div>
          <div class="feature-text">Generate comprehensive courses tailored to specific topics</div>
        </div>
        <div class="feature">
          <div class="feature-icon">📚</div>
          <div class="feature-title">Content Management</div>
          <div class="feature-text">Organize and structure educational materials</div>
        </div>
        <div class="feature">
          <div class="feature-icon">🚀</div>
          <div class="feature-title">Modern UI</div>
          <div class="feature-text">Clean, responsive interface for the best experience</div>
        </div>
      </div>
      
      <!-- Notice -->
      <div class="notice">
        If you did not sign up for ${PROJECT_NAME}, please disregard this email. No action is needed.
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p><strong>The ${PROJECT_NAME} Team</strong></p>
      
      <div class="social-links">
        <a href="#" class="social-icon">Twitter</a>
        <a href="#" class="social-icon">GitHub</a>
        <a href="#" class="social-icon">LinkedIn</a>
      </div>
      
      <p>© ${new Date().getFullYear()} ${PROJECT_NAME}. All rights reserved.</p>
      
      <div class="footer-links">
        <a href="#" class="footer-link">Privacy Policy</a>
        <a href="#" class="footer-link">Terms of Service</a>
        <a href="#" class="footer-link">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};