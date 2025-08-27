// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const getDashboardDetails = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/get-dashboard-details`,
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

  const getRoyaltyAchievers = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/get-royalty-achievers`,
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

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/get-all-users`,
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

  const getAllSubscribedUsers = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/get-all-users`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        const subscribedUsers = response.data.filter(
          (user) => user.subscribed === true
        );
        console.log(subscribedUsers);
        return subscribedUsers;
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

  const getPendingSubscriptionRequest = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/get-pending-subscription-request`,
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

  const approveSubscription = async (userId) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/approve-subscription`,
        { userId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Subscription approved successfully");
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

  const getPendingWithdrawRequest = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/get-pending-withdraw-request`,
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

  const approvePendingWithdrawRequest = async (requestId, statusPerform) => {
    try {
      if (!requestId) {
        toast.error("Request ID is required");
        return false;
      }
      if (statusPerform !== "approve" && statusPerform !== "reject") {
        toast.error(
          "Invalid statusPerform value. Expected 'approve' or 'reject'."
        );
        return false;
      }

      const token = localStorage.getItem("admin-token");
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/approve-pending-withdraw-request`,
        { requestId, statusPerform },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (statusPerform == "reject") {
          toast.success("Withdraw request rejected successfully");
        } else if (statusPerform == "approve") {
          toast.success("Withdraw request approved successfully");
        }
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

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/change-password`,
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

  const getPaymentDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/get-payment-details`,
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

  const updatePaymentDetails = async (paymentLink, walletQR) => {
    try {
      if (!paymentLink || !walletQR) {
        toast.error("Both payment link and wallet QR are required.");
        return false;
      }

      const token = localStorage.getItem("admin-token");
      const formData = new FormData();
      formData.append("paymentLink", paymentLink);
      if (walletQR) {
        formData.append("walletQR", walletQR);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/update-payment-details`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Payment details updated successfully");
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

  const getRoyaltyAchieversMain = async (fromDate, toDate) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/get-royalty-achievers-main`,
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            fromDate,
            toDate,
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
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const getTenDaysCompanyTurnover = async (fromDate, toDate) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/get-ten-days-company-turnover`,
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            fromDate,
            toDate,
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
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const payRoyaltyAchiever = async (userId, reward) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/pay-royalty-achiever`,
        {
          userId,
          reward,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const getAllApprovedSubscriptions = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/get-all-approved-subscriptions`,
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
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const deleteApprovedSubscription = async (subscriptionId) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/delete-approved-subscription/${subscriptionId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const addNotification = async (message) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/add-notification`,
        { message },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const getNotification = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/get-notification`
      );
      if (response.status === 200) {
        console.log("--", response.data);
        return await response.data;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const deleteNotification = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/delete-notification`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const toggleSiteMaintenance = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/toggle-site-maintenance`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const isSiteOnMaintenance = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/is-site-on-maintenance`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data.isSiteOnMaintenance;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const getBlockedUsers = async () => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/get-blocked-users`,
        {
          headers: {
            Authorization: token,
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
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const unblockUser = async (userId) => {
    try {
      const token = localStorage.getItem("admin-token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/unblock-user`,
        { userId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response?.data?.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getDashboardDetails,
        changePassword,
        getAllSubscribedUsers,
        getAllUsers,
        getRoyaltyAchievers,
        getPendingSubscriptionRequest,
        approveSubscription,
        getPendingWithdrawRequest,
        approvePendingWithdrawRequest,
        getPaymentDetails,
        updatePaymentDetails,
        getRoyaltyAchieversMain,
        getTenDaysCompanyTurnover,
        payRoyaltyAchiever,
        getAllApprovedSubscriptions,
        deleteApprovedSubscription,
        addNotification,
        getNotification,
        deleteNotification,
        toggleSiteMaintenance,
        isSiteOnMaintenance,
        getBlockedUsers,
        unblockUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
