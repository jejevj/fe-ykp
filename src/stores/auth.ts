import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  id: string;
  name: string;
  email: string;
  telp_number: string;
  role: string;
  image_url: string;
  is_verified: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken()); // Check if token exists in localStorage

  // Set authentication state (user data and token)
  function setAuth(authUser: User, token: string) {
    isAuthenticated.value = true;
    user.value = authUser;

    errors.value = {};
    JwtService.saveToken(token); // Save token from login response

    console.log("User Data Saved:", user.value);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = {};
    JwtService.destroyToken(); // Clear token on logout
  }


  function login(credentials: { email: string; password: string }) {
    return ApiService.post("user/login", credentials)
      .then(async ({ data }) => {

        // Step 1: Get the token and save it
        const token = data.data.token;
        JwtService.saveToken(token); // Save token after login

        // Step 2: Set the token in the Authorization header for subsequent requests
        ApiService.setHeader(); // This will set the Authorization header for all future requests

        // Step 3: Call user/me API using the saved token (it will automatically include the Bearer token)
        const userResponse = await ApiService.get("user/me");

        // Step 4: If user/me response is successful, populate authUser
        if (userResponse.data.status === true) {
          const authUser = {
            id: userResponse.data.data.id,
            name: userResponse.data.data.name,
            email: userResponse.data.data.email,
            telp_number: userResponse.data.data.telp_number,
            role: userResponse.data.data.role,
            image_url: userResponse.data.data.image_url,
            is_verified: userResponse.data.data.is_verified,
          };

          // console.log(authUser);
          localStorage.setItem("user_data", JSON.stringify(userResponse.data.data)); // Serialize to a string
          // console.log("User data saved to localStorage:", userResponse.data); // Log saved data
          // Step 5: Save the user data in the store
          setAuth(authUser, token);

          return { status: true, userData: userResponse.data };
        } else {
          return { status: false, error: "Failed to fetch user details" };
        }
      })
      .catch((error) => {
        console.error("Login error:", error);

        // Check if the error is a response error (i.e., from the API)
        if (error?.response) {
          // If it's a response error, handle it by showing the message from the response
          return { status: false, error: error?.response?.data?.error || "An error occurred" };
        }

        // If there's no response (network error or other), handle accordingly
        return { status: false, error: error?.message || "Network error or server is down" };
      });
  }



  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        const authUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          telp_number: data.user.telp_number,
          role: data.role,
          image_url: data.user.image_url,
          is_verified: data.user.is_verified,
        };
        const token = data.token;
        setAuth(authUser, token); // Save user and token after registration
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
