import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Contexts
import { AuthProvider } from "./context/AuthContext";
import { CustomerContext, CustomerProvider } from "./context/CustomerContext";
import { AdminAuthProvider } from "./Admin/AdminContext/AdminAuthContext";
import { AdminProvider } from "./Admin/AdminContext/AdminContext";

// Main Components
import { Navbar, Sidebar } from "./components/main";
import Signup from "./components/Signup";
import Login from "./components/login";
import Logout from "./components/Logout";
import ForgetPasswordForm from "./components/ForgetPassword";

// Layouts
import Layout from "./Layout";
import AdminLayout from "./Admin/AdminLayout";

// Routes & Protected Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./Admin/ProtectedRoute/AdminProtectedRoute";
import MaintenanceRoute from "./routes/MaintenanceRoute";
import EscapeMaintenanceRoute from "./routes/EscapeMaintenance";

// User Pages - Dashboard & Main
import {
  Dashboard,
  ReferralLinkBox,
  LevelTeamTable,
  DirectTeamTable,
} from "./pages/main";
import Message from "./pages/Message";
import Wallets from "./pages/Wallets";
import HelpPage from "./pages/HelpPage";
import OnMaintenancePage from "./pages/OnMaintenancePage";

// User Pages - Profile
import Profile from "./pages/profile/Profile";
import UpdateBank from "./pages/profile/UpdateBank";
import ChangePassword from "./pages/profile/ChangePassword";

// User Pages - Top-Up & Activation
import ActivatePackage from "./pages/top-up/ActivatePackage";
import ActivationHistory from "./pages/top-up/ActivationHistory";
import FundTransfer from "./pages/Activation Fund/FundTransfer";
import FundHistory from "./pages/Activation Fund/FundHistory";
import FundRequest from "./pages/Activation Fund/FundRequest";
import PurchaseSubscription from "./pages/PurchaseSubscription/PurchaseSubscription";

// User Pages - Withdraw
import Withdraw from "./pages/WithDraw/WithDraw";
import WithdrawHistory from "./pages/WithDraw/WithDrawHistory";

// User Pages - Transfer
import DepositToUser from "./pages/DepositeToUser/DepositeToUser";
import DepositToUserHistory from "./pages/DepositeToUser/DepositeToUserHistory";
import TransferToMainWallet from "./pages/TransferToMainWallet/TransferToMainWalletForm";

// User Pages - Income Details
import SingleLegIncome from "./pages/SingleLegIncome";
import ReferIncome from "./pages/Income Details/ReferIncome/ReferIncome";
import ReferBonus from "./pages/Income Details/ReferBonus";
import ROIIncome from "./pages/Income Details/ROIIncome";
import ROItoLevelIncome from "./pages/Income Details/ROItoLevelIncome";
import RewardTeamBonus from "./pages/Income Details/RewardTeamBonus";

// User Pages - Member List
import LevelTeam from "./pages/memberList/LevelTeam";
import NonActiveDirectTeamTable from "./pages/memberList/NonActiveDirectTeam";
import NonActiveLevelTeamTable from "./pages/memberList/NonActiveLevel";
import NonActiveLevelTeam from "./pages/memberList/NonActiveLevelTeam";

// Admin Components - Auth
import AdLogin from "./Admin/AdminComponents/AuthComponents/AdLogin";
import AdForgetPassword from "./Admin/AdminComponents/AuthComponents/AdForgetPassword";
import AdminLogout from "./Admin/AdminComponents/AuthComponents/AdminLogout";

// Admin Pages - Dashboard & Core
import AdminDashboard from "./Admin/adminPages/AdminDashboard";
import AdminProfileDetails from "./Admin/adminPages/AdminProfileDetails";
import MaintenancePage from "./Admin/adminPages/MaintenancePage";
import NotificationAddGetDelete from "./Admin/adminPages/NotificationAddGetDelete";
import UpdatePaymentLink from "./Admin/adminPages/UpdatePaymentLink";

// Admin Pages - User Management
import AllUsers from "./Admin/adminPages/AllUsers";
import SubscribedUsers from "./Admin/adminPages/SubscribedUsers";
import BlockedUsers from "./Admin/adminPages/BlockedUser";
import ResetPassword from "./Admin/adminPages/ResetPassword";

// Admin Pages - Withdraw & Subscription Approval
import ApproveWithdraw from "./Admin/adminPages/ApproveWithdraw";
import ApprovePendingSubscription from "./Admin/adminPages/ApprovePendingSubscription";
import ApprovedSubscription from "./Admin/adminPages/ApprovedSubscription";

// Admin Pages - Royalty Achievers
import RoyaltyAchieversMain from "./Admin/adminPages/RoyaltyAchievers/RoyaltyAchievers";
import WeeklyRoyaltyAchiever from "./Admin/adminPages/WeeklyRoyaltyAchiever";
import TenDaysRoyaltyAchiever from "./Admin/adminPages/TenDaysRoyaltyAchiever";
import PurchaseSubscriptionHistory from "./pages/PurchaseSubscription/PurchaseSubscriptionHistory";
import AllLogs from "./pages/AllLogs/AllLogs";
import ReferTeamIncome from "./pages/Income Details/ReferIncome/ReferTeamIncome";

function AppLayout() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forget-password" ||
    location.pathname === "/site-on-maintenance";

  return (
    <>
      <div className="flex ">
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdLogin />} />
            <Route path="forget-password" element={<AdForgetPassword />} />
            <Route path="logout" element={<AdminLogout />} />
            <Route
              index
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            {/* <Route path="company-turnover" element={<CompanyTurnover />} /> */}
            {/* <Route path="subscription-amount" element={<SubscriptionAmount />} /> */}
            {/* royalty-achievers */}

            <Route
              path="add-get-del-notifications"
              element={
                <AdminProtectedRoute>
                  <NotificationAddGetDelete />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="royalty-achievers"
              element={
                <AdminProtectedRoute>
                  <RoyaltyAchieversMain />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="royalty-achiever/weekly-royalty-achiver"
              element={
                <AdminProtectedRoute>
                  <WeeklyRoyaltyAchiever />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="update-payment-link"
              element={
                <AdminProtectedRoute>
                  <UpdatePaymentLink />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="maintenance-page"
              element={
                <AdminProtectedRoute>
                  <MaintenancePage />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="royalty-achiever/ten-days-royalty-achiver"
              element={
                <AdminProtectedRoute>
                  <TenDaysRoyaltyAchiever />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="admin-profile-details"
              element={
                <AdminProtectedRoute>
                  <AdminProfileDetails />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="reset-password"
              element={
                <AdminProtectedRoute>
                  <ResetPassword />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="users/subscribed-user"
              element={
                <AdminProtectedRoute>
                  <SubscribedUsers />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="users/all-users"
              element={
                <AdminProtectedRoute>
                  <AllUsers />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="users/blocked-users"
              element={
                <AdminProtectedRoute>
                  <BlockedUsers />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="approve-pending-subscription"
              element={
                <AdminProtectedRoute>
                  <ApprovePendingSubscription />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="approved-subscription"
              element={
                <AdminProtectedRoute>
                  <ApprovedSubscription />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="approve-withdraw"
              element={
                <AdminProtectedRoute>
                  <ApproveWithdraw />
                </AdminProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/site-on-maintenance"
            element={
              <EscapeMaintenanceRoute>
                <OnMaintenancePage />
              </EscapeMaintenanceRoute>
            }
          />

          <Route
            path="/"
            element={
              <MaintenanceRoute>
                <Layout isLoginPage={isLoginPage} />
              </MaintenanceRoute>
            }
          >
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPasswordForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <HelpPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/referral"
              element={
                <ProtectedRoute>
                  <ReferralLinkBox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase-subcription"
              element={
                <ProtectedRoute>
                  <PurchaseSubscription />
                </ProtectedRoute>
              }
            />

            <Route
              path="/purchase-subcription-histroy"
              element={
                <ProtectedRoute>
                  <PurchaseSubscriptionHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/wallets"
              element={
                <ProtectedRoute>
                  <Wallets />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transfer-to-main-wallet"
              element={
                <ProtectedRoute>
                  <TransferToMainWallet />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/global-team"
              element={
                <ProtectedRoute>
                  <GlobalTeamTable />
                </ProtectedRoute>
              }
            />

            <Route
              path="/non-active-global-team"
              element={
                <ProtectedRoute>
                  <NonActiveGlobalTeamTable />
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/level-team"
              element={
                <ProtectedRoute>
                  <LevelTeamTable />
                </ProtectedRoute>
              }
            />

            {[...Array(10).keys()].map((level) => (
              <Route
                key={level}
                path={`/level-team/${level}`}
                element={
                  <ProtectedRoute>
                    <LevelTeam levelIndex={level} />
                  </ProtectedRoute>
                }
              />
            ))}

            <Route
              path="/non-active-level-team"
              element={
                <ProtectedRoute>
                  <NonActiveLevelTeamTable />
                </ProtectedRoute>
              }
            />

            {[...Array(10).keys()].map((level) => (
              <Route
                key={level}
                path={`/non-active-level-team/${level}`}
                element={
                  <ProtectedRoute>
                    <NonActiveLevelTeam levelIndex={level} />
                  </ProtectedRoute>
                }
              />
            ))}

            <Route
              path="/direct-team"
              element={
                <ProtectedRoute>
                  <DirectTeamTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/non-active-direct-team"
              element={
                <ProtectedRoute>
                  <NonActiveDirectTeamTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updatebank"
              element={
                <ProtectedRoute>
                  <UpdateBank />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activate-package"
              element={
                <ProtectedRoute>
                  <ActivatePackage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activation-history"
              element={
                <ProtectedRoute>
                  <ActivationHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/roi-income"
              element={
                <ProtectedRoute>
                  <ROIIncome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/refer-income"
              element={
                <ProtectedRoute>
                  <ReferIncome />
                </ProtectedRoute>
              }
            />

            {[...Array(3).keys()].map((level) => (
              <Route
                key={level}
                path={`/refer-team-income/${level}`}
                element={
                  <ProtectedRoute>
                    <ReferTeamIncome levelIndex={level} />
                  </ProtectedRoute>
                }
              />
            ))}

            <Route
              path="/refer-bonus"
              element={
                <ProtectedRoute>
                  <ReferBonus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roi-to-level-income"
              element={
                <ProtectedRoute>
                  <ROItoLevelIncome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reward-team-bussiness"
              element={
                <ProtectedRoute>
                  <RewardTeamBonus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/single-leg"
              element={
                <ProtectedRoute>
                  <SingleLegIncome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund-request"
              element={
                <ProtectedRoute>
                  <FundRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund-transfer"
              element={
                <ProtectedRoute>
                  <FundTransfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fund-History"
              element={
                <ProtectedRoute>
                  <FundHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/withdraw"
              element={
                <ProtectedRoute>
                  <Withdraw />
                </ProtectedRoute>
              }
            />
            <Route
              path="/withdraw-history"
              element={
                <ProtectedRoute>
                  <WithdrawHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposite-to-user"
              element={
                <ProtectedRoute>
                  <DepositToUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposite-to-user-history"
              element={
                <ProtectedRoute>
                  <DepositToUserHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-logs"
              element={
                <ProtectedRoute>
                  <AllLogs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/message"
              element={
                <ProtectedRoute>
                  <Message />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <AdminProvider>
        <AuthProvider>
          <CustomerProvider>
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </CustomerProvider>
        </AuthProvider>
      </AdminProvider>
    </AdminAuthProvider>
  );
}

export default App;
