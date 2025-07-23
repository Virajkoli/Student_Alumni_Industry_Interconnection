// Test script to verify college fees functionality
console.log('Testing College Fees API...');

const testData = {
  btech: "₹150000",
  mtech: "₹100000",
  scholarships: [
    "Merit-based scholarships up to 100% fee waiver",
    "Need-based financial assistance"
  ],
  hostel: "₹80000",
  mess: "₹45000",
  customFees: [
    { id: 1, program: "BCA", amount: "₹75000" },
    { id: 2, program: "MCA", amount: "₹85000" }
  ],
  customCharges: [
    { id: 1, name: "Transport", amount: "₹5000" },
    { id: 2, name: "Uniform", amount: "₹3000" }
  ],
  customFields: [
    { id: 1, label: "Payment Methods", value: "Online, Offline, EMI" },
    { id: 2, label: "Refund Policy", value: "50% refundable before semester" }
  ]
};

console.log('Test data:', JSON.stringify(testData, null, 2));
console.log('Test completed.');
