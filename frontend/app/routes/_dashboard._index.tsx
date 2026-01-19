import React from "react";

function Index() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <p className="text-gray-600 text-sm">Dashboard</p>
        </div>

        {/* Sample Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Total Users", value: "2,543", change: "+12%" },
            { title: "Active Plans", value: "1,248", change: "+5%" },
            { title: "Revenue", value: "$45,231", change: "+23%" },
            { title: "Appointments", value: "342", change: "+8%" },
            { title: "New Payments", value: "$12,400", change: "+15%" },
            { title: "Referrals", value: "89", change: "+3%" },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-600 text-sm font-medium">{card.title}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-gray-900">
                  {card.value}
                </p>
                <p className="text-xs text-green-600 font-medium">
                  {card.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        User {i}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        user{i}@example.com
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        Jan {i}, 2025
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Index;
