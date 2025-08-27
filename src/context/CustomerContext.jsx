// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Logout from "../components/Logout";
export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [name, setName] = useState("");

  const [isSiteOnMaintenance, setIsSiteOnMaintenance] = useState(false);

  const checkSiteMaintenanceStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/is-site-on-maintenance`
      );
      if (response.status === 200) {
        console.log(response);
        setIsSiteOnMaintenance(await response.data.isSiteOnMaintenance);
        return await response.data.isSiteOnMaintenance;
      } else {
        console.error("Failed to fetch site maintenance status");
      }
    } catch (error) {
      console.error("Error checking site maintenance status:", error);
    }
  };

  const getCustomerProfileDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/customer/get-customer-profile-data`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setName(response.data.name);
        return response.data;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      window.location.href = "/login";
    }
  };

  const getProfileDetails = async () => {
    // /get-profile-details
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/get-profile-details`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const getReferalDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/get-referal-details`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const purchaseSubscription = async (paymentScreenshot, hashString) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("paymentScreenshot", paymentScreenshot);
      formData.append("hashString", hashString);

      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/customer/purchase-subscription`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success(
          "Subscription Applied successfully. Subscription will update in 30min"
        );
        return response;
      } else if (response.status === 211) {
        toast.error("Account is blocked. Please contact Admin.");
        return { status: 211 };
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Password changed successfully");
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  // /team-details
  const getTeamDetails = async (teamRef) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/team-details`,
        {
          params: { teamRef }, // ✅ sends teamRef as ?teamRef=value
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching team details:", error);
      throw error;
    }
  };

  const sendWithdrawalRequest = async (requestAmount, walletAddress) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/withdrawal-request`,
        { requestAmount, walletAddress },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Withdrawal request submitted successfully");
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const getWithdrawalRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/customer/get-withdrawal-requests`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error);
      throw error;
    }
  };

  const updateBankDetails = async (idType, bankId, walletQR) => {
    console.log(idType, bankId, walletQR);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("idType", idType);
      formData.append("bankId", bankId);
      formData.append("walletQR", walletQR);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/update-bank-details`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Bank details updated successfully");
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const transferAmount = async (userId, remark) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/transfer-money`,
        { userId, remark },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Amount transferred successfully");
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (error) {
      console.error("Error transferring amount:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const getSendersTransferHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/customer/get-senders-transfer-history`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sender's transfer history:", error);
      throw error;
    }
  };

  const transferMoneyToMainWallet = async (amount, remark) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/customer/transfer-money-to-main-wallet`,
        { amount, remark },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Money transferred to main wallet successfully");
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (error) {
      console.error("Error transferring money to main wallet:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const fetchUserName = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/fetch-user-name`,
        { userId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user name:", error);
      throw error;
    }
  };

  const getUserRoyaltyIncomeDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/customer/get-user-royalty-income-details`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          "Failed to fetch royalty income details:",
          response.data.message
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching royalty income details:", error);
      return null;
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        name,
        getReferalDetails,
        purchaseSubscription,
        getCustomerProfileDetails,
        getProfileDetails,
        changePassword,
        getTeamDetails,
        sendWithdrawalRequest,
        getWithdrawalRequests,
        updateBankDetails,
        transferAmount,
        getSendersTransferHistory,
        transferMoneyToMainWallet,
        fetchUserName,
        getUserRoyaltyIncomeDetails,
        checkSiteMaintenanceStatus,
        setIsSiteOnMaintenance,
        isSiteOnMaintenance,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
