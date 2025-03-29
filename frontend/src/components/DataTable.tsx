export default function DataTable() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Job</th>
              <th className="px-6 py-4">Employed</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { name: "John Michael", job: "Manager", date: "23/04/18" },
              { name: "Alexa Liras", job: "Developer", date: "23/04/18" },
              { name: "Laurent Perrier", job: "Executive", date: "19/09/17" },
              { name: "Michael Levi", job: "Developer", date: "24/12/08" },
              { name: "Richard Gran", job: "Manager", date: "04/10/21" },
            ].map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{row.name}</td>
                <td className="px-6 py-4">{row.job}</td>
                <td className="px-6 py-4">{row.date}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-white bg-blue-500 hover:bg-blue-600 transition px-3 py-1 rounded-md text-xs font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
