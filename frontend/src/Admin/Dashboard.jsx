

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../slice/adminSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiPackage, FiDollarSign, FiShoppingBag } from 'react-icons/fi';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalProducts = 0,
    totalUsers = 0,
    totalSales = 0,
    totalProfit = 0,
    totalOrders = 0,
    latestOrders = [],
    monthlySales = [],
    monthlyProfit = [],
    loading,
    error,
  } = useSelector((state) => state.admin);
console.log(totalUsers);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const recentOrders = latestOrders
    ?.map((order) => ({
      orderId: order?.orderId || 'N/A',
      userName: order?.user?.username || 'Unknown',
      orderDate: order?.orderDate || new Date().toISOString(),
      totalAmount:
        order?.cartItems?.reduce(
          (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 0),
          0
        ) || 0,
      status: order?.status || 'Pending',
    }))
    ?.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    ?.slice(0, 5) || [];

  const monthlyData = monthlySales?.map((sales, index) => ({
    month: new Date(0, index).toLocaleString('en-US', { month: 'short' }),
    sales: sales || 0,
    profit: monthlyProfit?.[index] || 0,
  })) || [];

  const metrics = [
    { 
      title: 'Total Sales', 
      value: `$${totalSales?.toFixed(2) || '0.00'}`, 
      icon: <FiDollarSign className="text-2xl" />,
      color: 'bg-purple-100 text-purple-600',
      trend: '+12%' 
    },
    { 
      title: 'Total Orders', 
      value: totalOrders || 0, 
      icon: <FiPackage className="text-2xl" />,
      color: 'bg-blue-100 text-blue',
      trend: '+5%' 
    },
    { 
      title: 'Total Users', 
      value: totalUsers || 0, 
      icon: <FiUsers className="text-2xl" />,
      color: 'bg-green-100 text-green',
      trend: '+2%' 
    },
    { 
      title: 'Total Products', 
      value: totalProducts || 0, 
      icon: <FiShoppingBag className="text-2xl" />,
      color: 'bg-yellow-100 text-yellow-600',
      trend: '+8%' 
    },
    { 
      title: 'Total Profit', 
      value: `$${totalProfit?.toFixed(2) || '0.00'}`, 
      icon: <FiTrendingUp className="text-2xl" />,
      color: 'bg-red-100 text-red-',
      trend: '+15%' 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  const cardTap = {
    scale: 0.98
  };

  if (loading) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-64"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </motion.div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center p-8 text-red-500"
    >
      Error: {error}
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 sm:p-6 bg-gray-50 min-h-screen"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
      >
        {metrics?.map((metric, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={cardHover}
            whileTap={cardTap}
            className={`p-5 rounded-xl shadow-sm transition-all ${metric.color} flex flex-col`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-80">{metric.title}</p>
                <p className="text-2xl font-bold mt-2">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-full ${metric.color.replace('text', 'bg').replace('100', '200')}`}>
                {metric.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded-full flex items-center">
                <FiTrendingUp className="mr-1" />
                {metric.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* Sales & Profit Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={cardHover}
          whileTap={cardTap}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FiTrendingUp className="mr-2 text-purple-500" />
            Monthly Performance
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#7C3AED', strokeWidth: 2 }}
                  name="Sales ($)"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
                  name="Profit ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          variants={itemVariants}
          whileHover={cardHover}
          whileTap={cardTap}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FiPackage className="mr-2 text-blue-500" />
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders?.map((order, index) => (
                  <motion.tr
                    key={order?.orderId || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 text-sm font-medium text-gray-700">
                      #{order?.orderId?.slice(-6) || 'N/A'}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium">
                            {order?.userName?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{order?.userName || 'Unknown'}</p>
                          <p className="text-xs text-gray-500">
                            {order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-bold">
                      ${order?.totalAmount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order?.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order?.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order?.status || 'Pending'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Additional Charts Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <motion.div
          whileHover={cardHover}
          whileTap={cardTap}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FiDollarSign className="mr-2 text-green-500" />
            Sales Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="sales"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                  name="Sales ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;