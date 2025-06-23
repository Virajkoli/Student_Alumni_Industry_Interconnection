import React from "react";
import { TrendingUp, Eye, ExternalLink } from "lucide-react";

const NewsSidebar = () => {
  const trendingNews = [
    {
      id: 1,
      title: "AI Startup Funding Reaches Record High",
      subtitle: "Technology sector sees 40% increase",
      time: "2h ago",
      views: "1,234 readers",
    },
    {
      id: 2,
      title: "Green Tech Revolution in 2024",
      subtitle: "Sustainability startups leading innovation",
      time: "4h ago",
      views: "890 readers",
    },
    {
      id: 3,
      title: "Remote Work Tools Market Boom",
      subtitle: "Post-pandemic digital transformation",
      time: "6h ago",
      views: "2,156 readers",
    },
    {
      id: 4,
      title: "Blockchain Adoption in Finance",
      subtitle: "Major banks embracing crypto",
      time: "8h ago",
      views: "756 readers",
    },
    {
      id: 5,
      title: "EdTech Platforms Gain Momentum",
      subtitle: "Online learning market expansion",
      time: "10h ago",
      views: "1,445 readers",
    },
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Product Manager at TechCorp",
      mutualConnections: 12,
      avatar: "A",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Startup Founder",
      mutualConnections: 8,
      avatar: "S",
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      title: "Investor at VentureX",
      mutualConnections: 15,
      avatar: "M",
    },
  ];

  return (
    <div className="space-y-4 sticky top-20">
      {/* Trending News */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Startup News
          </h3>
        </div>

        <div className="p-4 space-y-4">
          {trendingNews.map((news) => (
            <div key={news.id} className="cursor-pointer group">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {news.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">{news.subtitle}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{news.time}</span>
                <div className="flex items-center text-xs text-gray-500">
                  <Eye className="w-3 h-3 mr-1" />
                  {news.views}
                </div>
              </div>
            </div>
          ))}

          <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium pt-2 border-t border-gray-200">
            Show more news →
          </button>
        </div>
      </div>

      {/* People You May Know */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            People you may know
          </h3>
        </div>

        <div className="p-4 space-y-4">
          {suggestedConnections.map((person) => (
            <div key={person.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {person.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {person.name}
                  </h4>
                  <p className="text-xs text-gray-600">{person.title}</p>
                  <p className="text-xs text-gray-500">
                    {person.mutualConnections} mutual connections
                  </p>
                </div>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                Connect
              </button>
            </div>
          ))}

          <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium pt-2 border-t border-gray-200">
            Show more →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>

        <div className="p-4 space-y-3">
          <button className="w-full text-left flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">
              Find Investors
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full text-left flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">
              Join Events
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full text-left flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">
              Startup Resources
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
