// import { useState, useMemo } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { Save } from "lucide-react";

// // EMI Calculation Logic
// function calculateEMI({ principal, annualRate, tenureMonths, downPayment = 0 }) {
//   const loanAmount = Math.max(0, principal - (downPayment || 0));
//   const monthlyRate = annualRate / (12 * 100);

//   if (monthlyRate === 0) return loanAmount / tenureMonths;

//   return (
//     (loanAmount *
//       monthlyRate *
//       Math.pow(1 + monthlyRate, tenureMonths)) /
//     (Math.pow(1 + monthlyRate, tenureMonths) - 1)
//   );
// }

// const COLORS = ["#4F46E5", "#16A34A", "#E11D48", "#F97316"];

// export default function EMICalculator() {
//   const [values, setValues] = useState({
//     price: 1000000,
//     downPayment: 200000,
//     interest: 8,
//     tenure: 60,
//   });

//   const loanAmount = Math.max(0, values.price - values.downPayment);

//   const emi = useMemo(() => {
//     return calculateEMI({
//       principal: values.price,
//       annualRate: values.interest,
//       tenureMonths: values.tenure,
//       downPayment: values.downPayment,
//     });
//   }, [values]);

//   const totalPayment = emi * values.tenure;
//   const totalInterest = totalPayment - loanAmount;

//   // ----- CHART DATA ------
//   const lineChartData = Array.from({ length: values.tenure }).map((_, i) => ({
//     month: i + 1,
//     payment: emi,
//   }));

//   const pieData = [
//     { name: "Principal", value: loanAmount },
//     { name: "Total Interest", value: totalInterest },
//   ];

//   // ----- EXPORT CSV -----
//   const exportCSV = () => {
//     const rows = [
//       ["Month", "EMI"],
//       ...lineChartData.map((row) => [row.month, row.payment.toFixed(2)]),
//     ];

//     let csvContent = rows.map((e) => e.join(",")).join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "emi_schedule.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
//         EMI Calculator
//       </h1>

//       {/* Calculator Card */}
//       <div className="bg-white shadow-xl rounded-xl p-6 mb-10">
//         <div className="grid md:grid-cols-2 gap-6">

//           {/* Price */}
//           <div>
//             <label className="font-medium">Car Price (₹)</label>
//             <input
//               type="number"
//               className="w-full mt-1 p-2 border rounded-lg"
//               value={values.price}
//               onChange={(e) =>
//                 setValues({ ...values, price: Number(e.target.value) })
//               }
//             />
//           </div>

//           {/* Down Payment */}
//           <div>
//             <label className="font-medium">Down Payment (₹)</label>
//             <input
//               type="number"
//               className="w-full mt-1 p-2 border rounded-lg"
//               value={values.downPayment}
//               onChange={(e) =>
//                 setValues({ ...values, downPayment: Number(e.target.value) })
//               }
//             />
//           </div>

//           {/* Interest */}
//           <div>
//             <label className="font-medium">Interest Rate (%)</label>
//             <input
//               type="number"
//               className="w-full mt-1 p-2 border rounded-lg"
//               value={values.interest}
//               onChange={(e) =>
//                 setValues({ ...values, interest: Number(e.target.value) })
//               }
//             />
//           </div>

//           {/* Tenure */}
//           <div>
//             <label className="font-medium">Loan Tenure (Months)</label>
//             <input
//               type="number"
//               className="w-full mt-1 p-2 border rounded-lg"
//               value={values.tenure}
//               onChange={(e) =>
//                 setValues({ ...values, tenure: Number(e.target.value) })
//               }
//             />
//           </div>
//         </div>

//         {/* EMI Display */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-gray-700">
//             Monthly EMI: <span className="text-blue-600">₹{emi.toFixed(2)}</span>
//           </h2>
//           <p className="mt-2 text-gray-600">
//             Loan Amount: ₹{loanAmount.toLocaleString()}
//           </p>
//           <p className="text-gray-600">
//             Total Interest: ₹{totalInterest.toLocaleString()}
//           </p>
//         </div>

//         {/* Export Button */}
//         <button
//           onClick={exportCSV}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
//         >
//           <Save size={18} /> Download EMI Schedule
//         </button>
//       </div>

//       {/* Charts */}
//       <div className="grid md:grid-cols-2 gap-8">

//         {/* Line Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-4">EMI Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={lineChartData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="payment" stroke="#4F46E5" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-4">Loan Breakdown</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 outerRadius={100}
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//       </div>
//     </div>
//   );
// }
import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { Save, TrendingUp, DollarSign, Calendar } from "lucide-react";

// EMI Calculation Logic
function calculateEMI({ principal, annualRate, tenureMonths, downPayment = 0 }) {
  const loanAmount = Math.max(0, principal - (downPayment || 0));
  const monthlyRate = annualRate / (12 * 100);

  if (monthlyRate === 0) return loanAmount / tenureMonths;

  return (
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
}

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EC4899"];

export default function EMICalculator() {
  const [values, setValues] = useState({
    price: 1000000,
    downPayment: 200000,
    interest: 8,
    tenure: 60,
  });

  const loanAmount = Math.max(0, values.price - values.downPayment);

  const emi = useMemo(() => {
    return calculateEMI({
      principal: values.price,
      annualRate: values.interest,
      tenureMonths: values.tenure,
      downPayment: values.downPayment,
    });
  }, [values]);

  const totalPayment = emi * values.tenure;
  const totalInterest = totalPayment - loanAmount;

  // ----- AMORTIZATION SCHEDULE -----
  const amortizationData = useMemo(() => {
    const schedule = [];
    let balance = loanAmount;
    const monthlyRate = values.interest / (12 * 100);

    for (let i = 1; i <= values.tenure; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }
    return schedule;
  }, [values, emi, loanAmount]);

  const pieData = [
    { name: "Principal", value: loanAmount },
    { name: "Total Interest", value: totalInterest },
  ];

  // ----- EXPORT CSV -----
  const exportCSV = () => {
    const rows = [
      ["Month", "EMI", "Principal", "Interest", "Balance"],
      ...amortizationData.map((row) => [
        row.month,
        emi.toFixed(2),
        row.principal.toFixed(2),
        row.interest.toFixed(2),
        row.balance.toFixed(2),
      ]),
    ];

    let csvContent = rows.map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "emi_schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            EMI Calculator
          </h1>
          <p className="text-gray-600 text-lg">Plan your loan with precision and clarity</p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-10 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Price */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign size={18} className="text-indigo-600" />
                Car Price (₹)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                value={values.price}
                onChange={(e) =>
                  setValues({ ...values, price: Number(e.target.value) })
                }
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign size={18} className="text-green-600" />
                Down Payment (₹)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                value={values.downPayment}
                onChange={(e) =>
                  setValues({ ...values, downPayment: Number(e.target.value) })
                }
              />
            </div>

            {/* Interest */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <TrendingUp size={18} className="text-orange-600" />
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                value={values.interest}
                onChange={(e) =>
                  setValues({ ...values, interest: Number(e.target.value) })
                }
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={18} className="text-purple-600" />
                Loan Tenure (Months)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                value={values.tenure}
                onChange={(e) =>
                  setValues({ ...values, tenure: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* EMI Display */}
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Monthly EMI</h2>
              <div className="text-5xl font-extrabold mb-4">₹{emi.toFixed(2)}</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm opacity-90">Loan Amount</p>
                  <p className="text-xl font-bold">₹{loanAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm opacity-90">Total Interest</p>
                  <p className="text-xl font-bold">₹{totalInterest.toFixed(0).toLocaleString()}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm opacity-90">Total Payment</p>
                  <p className="text-xl font-bold">₹{totalPayment.toFixed(0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportCSV}
            className="mt-6 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all font-semibold"
          >
            <Save size={20} /> Download EMI Schedule
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">

          {/* Principal vs Interest Over Time */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" />
              Principal vs Interest Payment
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={amortizationData}>
                <defs>
                  <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="principal" stackId="1" stroke="#6366F1" fill="url(#colorPrincipal)" />
                <Area type="monotone" dataKey="interest" stackId="1" stroke="#10B981" fill="url(#colorInterest)" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Calendar className="text-purple-600" />
              Loan Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Full Width Charts */}
        <div className="grid md:grid-cols-1 gap-8">

          {/* Outstanding Balance Over Time */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Outstanding Loan Balance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={amortizationData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="url(#balanceGradient)" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Breakdown Bar Chart */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <DollarSign className="text-orange-600" />
              Monthly Payment Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={amortizationData.filter((_, i) => i % Math.max(1, Math.floor(values.tenure / 12)) === 0)}>
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="principal" stackId="a" fill="#6366F1" radius={[0, 0, 8, 8]} />
                <Bar dataKey="interest" stackId="a" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </div>
  );
}