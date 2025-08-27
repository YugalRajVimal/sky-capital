import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { getProfileDetails } = useContext(CustomerContext);
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const data = await getProfileDetails();
      setProfileDetails(data);
    };

    fetchProfileDetails();
  }, []);

  return (
    <div className="min-h-[90vh] w-full sm:h-full flex justify-center items-start py-10 px-4 rounded-2xl overflow-hidden hide-scrollbar">
      <div className="w-full max-w-3xl bg-[#20265d] rounded-2xl shadow-lg h-[80vh] overflow-x-auto hide-scrollbar">
        {/* Header */}
        <div className="bg-[#20265d] p-6 text-white flex items-center gap-4 rounded-t-2xl border-x-0 border-t-0 border-b-[1px] border-white">
          <FaUserCircle className="text-5xl" />
          <div>
            <h2 className="text-2xl font-semibold">
              {profileDetails?.name || "Loading..."}
            </h2>
            <p className="text-sm opacity-80">{profileDetails?.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-white rounded-b-2xl">
          <Field label="Phone Number" value={profileDetails?.phoneNo} />
          <Field label="User ID" value={profileDetails?.userId} />
          <Field label="Sponsor ID" value={profileDetails?.sponsorId} />
          {/* <Field label="Sponsor Name" value={profileDetails?.sponsorName} /> */}
          <Field label="Network Type" value={profileDetails?.idType} />
          <Field label="Wallet Address" value={profileDetails?.bankId} />
          {profileDetails?.referalId && (
            <Field label="Referral ID" value={profileDetails?.referalId} />
          )}
          <Field
            label="Subscribed"
            value={
              profileDetails?.subscribed ? (
                <span className="text-green-600 font-semibold">Yes ✅</span>
              ) : (
                <span className="text-red-500 font-semibold">No ❌</span>
              )
            }
          />
          <Field
            label="Joined On"
            value={
              profileDetails?.joinedOn
                ? new Date(profileDetails.joinedOn).toLocaleDateString(
                    "en-IN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="w-full break-words">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium">{value || "—"}</p>
  </div>
);

export default Profile;
