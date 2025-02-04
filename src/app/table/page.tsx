"use client";

const data = [
  { id: 1, name: "Alice", age: 25, city: "New York", status: "Active" },
  { id: 2, name: "Bob", age: 30, city: "Los Angeles", status: "Inactive" },
  { id: 3, name: "Charlie", age: 28, city: "Chicago", status: "Active" },
];

export default function TailwindTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        {/* Table Header */}
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Age</th>
            <th className="p-3 border-b">City</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="odd:bg-gray-100 even:bg-white hover:bg-gray-300 transition"
            >
              <td className="p-3 border-b">{item.name}</td>
              <td className="p-3 border-b">{item.age}</td>
              <td className="p-3 border-b">{item.city}</td>

              {/* Select Dropdown Column */}
              <td className="p-3 border-b">
                <select
                  defaultValue={item.status}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>

              {/* Button Column */}
              <td className="p-3 border-b">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}