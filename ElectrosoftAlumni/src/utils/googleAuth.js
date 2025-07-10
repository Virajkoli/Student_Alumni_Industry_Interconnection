// Google Authentication utility using Google Identity Services (GIS)
const GOOGLE_CLIENT_ID =
  "120148362755-dmisbc1usk06heg33nan4cklovcreqm6.apps.googleusercontent.com";

class GoogleAuthService {
  constructor() {
    this.google = null;
    this.isInitialized = false;
  }

  // Initialize Google Identity Services
  async initializeGoogleAuth() {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
          this.loadgoogle_identityServices().then(resolve).catch(reject);
        };
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        this.loadgoogle_identityServices().then(resolve).catch(reject);
      }
    });
  }

  async loadgoogle_identityServices() {
    return new Promise((resolve, reject) => {
      try {
        // Initialize Google Identity Services
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: this.handleCredentialResponse.bind(this),
        });

        this.google = window.google;
        this.isInitialized = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Handle credential response (for popup flow)
  handleCredentialResponse(response) {
    // This will be used for the popup flow
    console.log("Credential response:", response);
  }

  // Sign in with Google using popup
  async signInWithGoogle() {
    if (!this.isInitialized) {
      await this.initializeGoogleAuth();
    }

    return new Promise((resolve, reject) => {
      try {
        // Use the popup flow
        window.google.accounts.oauth2
          .initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: "email profile",
            callback: async (response) => {
              if (response.error) {
                reject(new Error(response.error));
                return;
              }

              try {
                // Get user info using the access token
                const userInfo = await this.getUserInfo(response.access_token);
                resolve({
                  id: userInfo.id,
                  name: userInfo.name,
                  email: userInfo.email,
                  firstName: userInfo.given_name,
                  lastName: userInfo.family_name,
                  imageUrl: userInfo.picture,
                  accessToken: response.access_token,
                });
              } catch (error) {
                reject(error);
              }
            },
          })
          .requestAccessToken();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Get user info using access token
  async getUserInfo(accessToken) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );
    if (!response.ok) {
      throw new Error("Failed to get user info");
    }
    return response.json();
  }

  // Sign out
  async signOut() {
    if (!this.isInitialized) return;

    try {
      window.google.accounts.id.disableAutoSelect();
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  // Get current user (not directly available in GIS, need to store locally)
  getCurrentUser() {
    // In GIS, we don't have persistent user state
    // You might want to store user info in localStorage after sign in
    const storedUser = localStorage.getItem("googleUser");
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

export default new GoogleAuthService();
