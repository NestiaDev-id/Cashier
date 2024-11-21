import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Membership() {
  const [members, setMembers] = useState([]); // State to hold the membership data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch the membership data from the API
  //   useEffect(() => {
  //     const fetchMembershipData = async () => {
  //       try {
  //         const response = await fetch();
  //         //   "https://your-api-url/api/user/membership/all"
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch membership data");
  //         }
  //         const data = await response.json();
  //         setMembers(data); // Store the data in state
  //       } catch (error) {
  //         setError(error.message); // Handle errors
  //       } finally {
  //         setLoading(false); // Set loading to false when data is fetched or an error occurs
  //       }
  //     };

  //     fetchMembershipData();
  //   }, []); // Empty dependency array to run only once when the component mounts

  // Mock data dump
  const mockData = [
    {
      id: 1,
      username: "john_doe",
      alamat_rumah: "123 Main St, City, Country",
      email: "john.doe@example.com",
      phone_number: "123-456-7890",
    },
    {
      id: 2,
      username: "jane_doe",
      alamat_rumah: "456 Oak St, City, Country",
      email: "jane.doe@example.com",
      phone_number: "987-654-3210",
    },
    {
      id: 3,
      username: "alex_smith",
      alamat_rumah: "789 Pine St, City, Country",
      email: "alex.smith@example.com",
      phone_number: "555-123-4567",
    },
    {
      id: 4,
      username: "mary_jones",
      alamat_rumah: "321 Elm St, City, Country",
      email: "mary.jones@example.com",
      phone_number: "333-444-5555",
    },
  ];

  useEffect(() => {
    // Simulating API call with mock data
    setTimeout(() => {
      setMembers(mockData); // Set the mock data as the members
      setLoading(false); // Set loading to false after data is loaded
    }, 1000); // Simulate a 1-second delay for loading
  }, []);
  // Placeholder state for Sidebar control (for responsive design)
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Rendering the table with membership data
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <Navbar name="Dashboard" />

        <div className="bg-white rounded-lg shadow p-6 mt-3 mr-3 ml-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">Daftar Memberlist</h2>
            <button className="px-4 py-2 mb-3 bg-blue-500 text-white rounded">
              Tambah
            </button>
          </div>

          {loading && <p>Loading data...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Render the membership data table if no loading or error */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Username
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Alamat Rumah
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Email Address
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.username}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.alamat_rumah}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {member.phone_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Membership;
