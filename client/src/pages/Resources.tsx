import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HOMEBOT_ACCOUNT_ID } from '@/lib/constants';

// Component for buyer/seller resource downloads
const ResourceDownload = ({ title, description, icon, buttonText }: { title: string, description: string, icon: string, buttonText: string }) => (
  <Card className="h-full transition-all hover:shadow-lg">
    <CardHeader>
      <div className="flex items-start">
        <div className="bg-secondary rounded-full p-3 mr-4 text-white">
          <i className={`fas ${icon}`}></i>
        </div>
        <div>
          <CardTitle className="font-display text-xl text-primary">{title}</CardTitle>
          <CardDescription className="text-neutral-600 mt-2">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button className="w-full bg-primary hover:bg-primary-light text-white font-secondary transition-standard">
        {buttonText} <i className="fas fa-download ml-2"></i>
      </Button>
    </CardContent>
  </Card>
);

// Mortgage Calculator Component
const MortgageCalculator = () => {
  const [price, setPrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(400000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Calculate mortgage payment
    const calculateMortgage = () => {
      const principal = price - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      
      if (principal > 0 && monthlyRate > 0) {
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        setMonthlyPayment(Math.round(payment));
      } else {
        setMonthlyPayment(0);
      }
    };
    
    calculateMortgage();
  }, [price, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-display font-bold text-primary mb-6">Luxury Property Mortgage Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="price" className="block text-neutral-700 font-secondary text-sm mb-2">
              Property Price: {formatCurrency(price)}
            </label>
            <input
              type="range"
              id="price"
              min="1000000"
              max="10000000"
              step="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="downPayment" className="block text-neutral-700 font-secondary text-sm mb-2">
              Down Payment: {formatCurrency(downPayment)} ({Math.round(downPayment/price*100)}%)
            </label>
            <input
              type="range"
              id="downPayment"
              min={price * 0.1}
              max={price * 0.5}
              step="10000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="interestRate" className="block text-neutral-700 font-secondary text-sm mb-2">
              Interest Rate: {interestRate}%
            </label>
            <input
              type="range"
              id="interestRate"
              min="2.5"
              max="8.5"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="loanTerm" className="block text-neutral-700 font-secondary text-sm mb-2">
              Loan Term: {loanTerm} years
            </label>
            <div className="flex space-x-4">
              <button 
                onClick={() => setLoanTerm(15)} 
                className={`flex-1 py-2 rounded transition-standard font-secondary ${loanTerm === 15 ? 'bg-secondary text-white' : 'bg-neutral-100 text-neutral-700'}`}
              >
                15 years
              </button>
              <button 
                onClick={() => setLoanTerm(30)} 
                className={`flex-1 py-2 rounded transition-standard font-secondary ${loanTerm === 30 ? 'bg-secondary text-white' : 'bg-neutral-100 text-neutral-700'}`}
              >
                30 years
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center items-center bg-neutral-100 p-8 rounded-lg">
          <h4 className="text-xl font-secondary font-medium text-neutral-700 mb-2">Estimated Monthly Payment</h4>
          <div className="text-4xl font-display font-bold text-primary mb-4">
            {formatCurrency(monthlyPayment)}
          </div>
          <div className="text-sm text-neutral-500 mb-6 text-center">
            Principal and Interest Only. Taxes and Insurance Not Included.
          </div>
          <Link 
            href="/contact" 
            className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
          >
            Speak with a Mortgage Expert
          </Link>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <h4 className="text-lg font-display font-semibold text-primary mb-2">Luxury Financing Options</h4>
        <p className="text-neutral-600 mb-2">
          Financing luxury properties often comes with unique considerations. Some options include:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-600">
          <li>Jumbo Loans for high-value properties</li>
          <li>Portfolio Loans with flexible qualification criteria</li>
          <li>Asset-Based Lending using investment portfolios as collateral</li>
          <li>Interest-Only options for cash flow management</li>
        </ul>
      </div>
    </div>
  );
};

// Market Report Preview Component
const MarketReport = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-display font-bold text-primary mb-6">The Ridges Market Report</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-neutral-100 p-4 rounded-lg text-center">
        <div className="text-3xl font-display font-bold text-primary mb-2">$1,205</div>
        <div className="text-neutral-600 text-sm font-secondary">Price Per Square Foot</div>
      </div>
      <div className="bg-neutral-100 p-4 rounded-lg text-center">
        <div className="text-3xl font-display font-bold text-primary mb-2">$4.2M</div>
        <div className="text-neutral-600 text-sm font-secondary">Average Sale Price</div>
      </div>
      <div className="bg-neutral-100 p-4 rounded-lg text-center">
        <div className="text-3xl font-display font-bold text-primary mb-2">42</div>
        <div className="text-neutral-600 text-sm font-secondary">Average Days on Market</div>
      </div>
    </div>
    
    <div className="space-y-6 mb-8">
      <div>
        <h4 className="text-lg font-display font-semibold text-primary mb-2">Current Market Trends</h4>
        <p className="text-neutral-600">
          The Ridges continues to be one of Las Vegas' most desirable luxury communities, with property values showing consistent appreciation over time. Limited inventory has created a competitive market for the most desirable properties.
        </p>
      </div>
      
      <div>
        <h4 className="text-lg font-display font-semibold text-primary mb-2">Recent Developments</h4>
        <p className="text-neutral-600">
          Custom home construction continues in select neighborhoods, with architectural trends favoring contemporary desert designs with expanded indoor/outdoor living spaces and smart home technology.
        </p>
      </div>
    </div>
    
    <div className="text-center">
      <Button className="bg-primary hover:bg-primary-light text-white font-secondary">
        Download Full Market Report <i className="fas fa-file-pdf ml-2"></i>
      </Button>
    </div>
  </div>
);

// Home Valuation Section
const HomeValuation = () => {
  // Initialize Homebot widget when component mounts
  useEffect(() => {
    if (window.Homebot) {
      window.Homebot('#homebot_homeowner_resources', HOMEBOT_ACCOUNT_ID);
    }
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-primary mb-4">What's Your Home Worth?</h3>
        <p className="text-neutral-600 mb-6">
          Get an AI-powered valuation of your luxury property with our advanced home valuation tool. Receive detailed insights including:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
            <div className="flex items-center text-secondary mb-2">
              <i className="fas fa-chart-line text-lg"></i>
              <h4 className="font-display font-semibold ml-2">Current Value</h4>
            </div>
            <p className="text-neutral-600 text-sm">Precise current market valuation</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
            <div className="flex items-center text-secondary mb-2">
              <i className="fas fa-history text-lg"></i>
              <h4 className="font-display font-semibold ml-2">Value History</h4>
            </div>
            <p className="text-neutral-600 text-sm">Track changes over time</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
            <div className="flex items-center text-secondary mb-2">
              <i className="fas fa-percentage text-lg"></i>
              <h4 className="font-display font-semibold ml-2">Equity Position</h4>
            </div>
            <p className="text-neutral-600 text-sm">Your current equity percentage</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
            <div className="flex items-center text-secondary mb-2">
              <i className="fas fa-calculator text-lg"></i>
              <h4 className="font-display font-semibold ml-2">Investment Value</h4>
            </div>
            <p className="text-neutral-600 text-sm">Return on investment analysis</p>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-100 rounded-lg p-8 shadow-lg">
        <div id="homebot_homeowner_resources"></div>
      </div>
    </div>
  );
};

// Blog Preview Component
const BlogPreview = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="overflow-hidden hover:shadow-lg transition-all">
        <img 
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
          alt="Luxury home with swimming pool" 
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <div className="text-sm text-neutral-500 mb-2">Market Insights • May 15, 2023</div>
          <CardTitle className="font-display text-xl text-primary">The Luxury Market Outlook: What to Expect in 2023</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 mb-4">
            As we navigate through 2023, the luxury real estate market in Las Vegas continues to evolve. Here's what high-end buyers and sellers should know about current trends and future projections.
          </p>
          <Link href="/resources#blog" className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center">
            Read More <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden hover:shadow-lg transition-all">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
          alt="Modern desert home with mountain views" 
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <div className="text-sm text-neutral-500 mb-2">Design Trends • April 28, 2023</div>
          <CardTitle className="font-display text-xl text-primary">Desert Modern: Design Trends in The Ridges</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 mb-4">
            The architectural landscape of The Ridges Summerlin continues to evolve with innovative design concepts that blend luxury with desert-inspired aesthetics. Explore the latest trends.
          </p>
          <Link href="/resources#blog" className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center">
            Read More <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </CardContent>
      </Card>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="text-sm text-neutral-500 mb-1">Investment • March 10, 2023</div>
          <CardTitle className="font-display text-lg text-primary">Tax Benefits of Luxury Real Estate Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 text-sm mb-2">
            Understanding the tax advantages available to luxury property owners can significantly impact your investment strategy.
          </p>
          <Link href="/resources#blog" className="text-secondary hover:text-secondary-dark font-secondary text-sm inline-flex items-center">
            Read More <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="text-sm text-neutral-500 mb-1">Community • February 22, 2023</div>
          <CardTitle className="font-display text-lg text-primary">The Ridges: Las Vegas' Most Exclusive Address</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 text-sm mb-2">
            What makes The Ridges Summerlin the most coveted luxury community in Las Vegas? We explore the unique features that set it apart.
          </p>
          <Link href="/resources#blog" className="text-secondary hover:text-secondary-dark font-secondary text-sm inline-flex items-center">
            Read More <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-all">
        <CardHeader>
          <div className="text-sm text-neutral-500 mb-1">Lifestyle • January 15, 2023</div>
          <CardTitle className="font-display text-lg text-primary">Beyond the Home: Luxury Lifestyle in Summerlin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 text-sm mb-2">
            From world-class dining to exclusive cultural events, discover the luxury lifestyle that awaits residents of The Ridges Summerlin.
          </p>
          <Link href="/resources#blog" className="text-secondary hover:text-secondary-dark font-secondary text-sm inline-flex items-center">
            Read More <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </CardContent>
      </Card>
    </div>
    
    <div className="text-center">
      <Button className="bg-primary hover:bg-primary-light text-white font-secondary">
        View All Articles <i className="fas fa-newspaper ml-2"></i>
      </Button>
    </div>
  </div>
);

// Relocation Information Component
const RelocationInfo = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-display font-bold text-primary mb-6">Relocating to Las Vegas</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <h4 className="text-lg font-display font-semibold text-primary mb-4">Living in Las Vegas</h4>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-secondary rounded-full p-2 mr-3 text-white mt-1">
              <i className="fas fa-sun text-sm"></i>
            </div>
            <div>
              <h5 className="font-secondary font-semibold">Climate</h5>
              <p className="text-neutral-600 text-sm">
                Enjoy over 300 days of sunshine annually with mild winters and warm summers. The Ridges' elevated location provides cooler temperatures than the Las Vegas valley floor.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-secondary rounded-full p-2 mr-3 text-white mt-1">
              <i className="fas fa-university text-sm"></i>
            </div>
            <div>
              <h5 className="font-secondary font-semibold">Education</h5>
              <p className="text-neutral-600 text-sm">
                Access to top-rated public and private schools, including The Meadows School and the prestigious Alexander Dawson School at Rainbow Mountain.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-secondary rounded-full p-2 mr-3 text-white mt-1">
              <i className="fas fa-hospital text-sm"></i>
            </div>
            <div>
              <h5 className="font-secondary font-semibold">Healthcare</h5>
              <p className="text-neutral-600 text-sm">
                World-class healthcare facilities including Summerlin Hospital Medical Center and the nearby Cleveland Clinic Lou Ruvo Center for Brain Health.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-display font-semibold text-primary mb-4">Lifestyle & Recreation</h4>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-secondary rounded-full p-2 mr-3 text-white mt-1">
              <i className="fas fa-shopping-bag text-sm"></i>
            </div>
            <div>
              <h5 className="font-secondary font-semibold">Shopping & Dining</h5>
              <p className="text-neutral-600 text-sm">
                Downtown Summerlin offers luxury shopping and fine dining just minutes away, including exclusive boutiques and award-winning restaurants.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-secondary rounded-full p-2 mr-3 text-white mt-1">
              <i className="fas fa-hiking text-sm"></i>
            </div>
            <div>
              <h5 className="font-secondary font-semibold">Outdoor Recreation</h5>
              <p className="text-neutral-600 text-sm">
                From hiking in nearby Red Rock Canyon to golfing at Bear's Best, outdoor enthusiasts will find endless opportunities to enjoy the natural beauty of the area.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-secondary rounded-full p-2 mr-3 text-white mt-1">
              <i className="fas fa-plane text-sm"></i>
            </div>
            <div>
              <h5 className="font-secondary font-semibold">Travel Convenience</h5>
              <p className="text-neutral-600 text-sm">
                Harry Reid International Airport is just 20 minutes away, offering convenient access for frequent travelers and maintaining global connections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="text-center">
      <Link 
        href="/contact"
        className="inline-block px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard"
      >
        Request Relocation Guide
      </Link>
    </div>
  </div>
);

// Main Resources Page Component
const Resources = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("buyer");
  
  // Set page title and meta description
  useEffect(() => {
    document.title = "Resources | The Ridges Summerlin Luxury Real Estate";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Access exclusive resources for luxury real estate in The Ridges Summerlin including property valuation tools, market reports, mortgage calculators, and expert buying and selling guides.");
    }
    
    // Check if there's a tab parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    
    // If there's a valid tab parameter, set it as the active tab
    if (tabParam && ['buyer', 'seller', 'mortgage', 'market', 'valuation', 'relocation', 'blog'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  // Update URL when tab changes
  useEffect(() => {
    // Don't update URL on initial load
    if (activeTab !== "buyer" || window.location.search.includes('tab=')) {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      window.history.replaceState({}, '', url.toString());
    }
  }, [activeTab]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
        >
        </div>
        <div className="absolute inset-0 gradient-overlay"></div>
        
        <div className="container mx-auto h-full px-4 md:px-8 relative z-10 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Luxury Real Estate <span className="text-secondary">Resources</span>
            </h1>
            <p className="text-xl text-neutral-100 mt-4">
              Expert insights and tools for buyers and sellers in The Ridges Summerlin
            </p>
          </div>
        </div>
      </section>

      {/* Resources Content */}
      <section className="py-20 px-4 md:px-8 bg-neutral-50">
        <div className="container mx-auto">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-12 w-full">
              <TabsTrigger value="buyer" className="text-center py-3 font-secondary font-medium">Buyer's Guide</TabsTrigger>
              <TabsTrigger value="seller" className="text-center py-3 font-secondary font-medium">Seller's Guide</TabsTrigger>
              <TabsTrigger value="mortgage" className="text-center py-3 font-secondary font-medium">Mortgage Calculator</TabsTrigger>
              <TabsTrigger value="market" className="text-center py-3 font-secondary font-medium">Market Reports</TabsTrigger>
              <TabsTrigger value="valuation" id="valuation" className="text-center py-3 font-secondary font-medium">Home Valuation</TabsTrigger>
              <TabsTrigger value="relocation" className="text-center py-3 font-secondary font-medium">Relocation</TabsTrigger>
              <TabsTrigger value="blog" className="text-center py-3 font-secondary font-medium">Blog</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <h2 className="text-3xl font-display font-bold text-primary mb-6">Luxury Home Buyer's Guide</h2>
                    
                    <div className="space-y-6 text-neutral-700 mb-8">
                      <p>
                        Purchasing a luxury property in The Ridges Summerlin is an exciting journey that requires specialized knowledge and expertise. This comprehensive guide will walk you through the key considerations for high-end property acquisition.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-display font-semibold text-primary mb-2">Understanding The Ridges Market</h3>
                        <p>
                          The Ridges offers various neighborhoods with unique characteristics. From custom homesites to completed luxury estates, understanding the nuances of each area is crucial for making an informed decision.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-display font-semibold text-primary mb-2">Financing Luxury Properties</h3>
                        <p>
                          High-value properties often require specialized financing solutions. Jumbo loans, portfolio lending, and asset-based financing options provide flexibility for luxury home purchases.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-display font-semibold text-primary mb-2">Due Diligence for Luxury Homes</h3>
                        <p>
                          Comprehensive property inspections, review of HOA regulations, and assessment of long-term value are essential steps in the luxury home buying process.
                        </p>
                      </div>
                    </div>
                    
                    <Button className="bg-secondary hover:bg-secondary-dark text-white font-secondary">
                      Download Complete Buyer's Guide <i className="fas fa-download ml-2"></i>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResourceDownload 
                      title="First-Time Luxury Buyer Guide" 
                      description="Essential information for those entering the luxury market for the first time."
                      icon="fa-star" 
                      buttonText="Download Guide" 
                    />
                    
                    <ResourceDownload 
                      title="The Ridges Property Checklist" 
                      description="What to look for when evaluating properties in The Ridges Summerlin."
                      icon="fa-clipboard-check" 
                      buttonText="Download Checklist" 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-display font-bold mb-6">Buyer Consultation</h3>
                    <p className="text-neutral-200 mb-6">
                      Schedule a personalized consultation to discuss your luxury home requirements. I'll help you navigate The Ridges market with expert guidance.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Custom property search tailored to your preferences</p>
                      </div>
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Exclusive access to off-market luxury properties</p>
                      </div>
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Expert negotiation strategy for optimal value</p>
                      </div>
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Comprehensive guidance through the closing process</p>
                      </div>
                    </div>
                    
                    <Link 
                      href="/contact"
                      className="block w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
                    >
                      Schedule Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="seller" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <h2 className="text-3xl font-display font-bold text-primary mb-6">Luxury Home Seller's Guide</h2>
                    
                    <div className="space-y-6 text-neutral-700 mb-8">
                      <p>
                        Selling a luxury property in The Ridges Summerlin requires a strategic approach that highlights its unique qualities and reaches qualified buyers. This comprehensive guide outlines the essential steps for a successful sale.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-display font-semibold text-primary mb-2">Premium Property Presentation</h3>
                        <p>
                          From professional photography to virtual tours, presenting your luxury home in its best light is crucial. Learn how staging, lighting, and property preparation can significantly impact buyer perception.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-display font-semibold text-primary mb-2">Strategic Pricing for Luxury Homes</h3>
                        <p>
                          Determining the optimal price point for a luxury property involves complex market analysis. Understand how comparable sales, unique features, and market conditions influence pricing strategy.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-display font-semibold text-primary mb-2">Global Marketing Approach</h3>
                        <p>
                          Luxury properties require exposure beyond local markets. Learn about specialized marketing channels that target high-net-worth individuals and international buyers.
                        </p>
                      </div>
                    </div>
                    
                    <Button className="bg-secondary hover:bg-secondary-dark text-white font-secondary">
                      Download Complete Seller's Guide <i className="fas fa-download ml-2"></i>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResourceDownload 
                      title="Luxury Home Staging Guide" 
                      description="Expert tips for presenting your property to attract discerning buyers."
                      icon="fa-house-user" 
                      buttonText="Download Guide" 
                    />
                    
                    <ResourceDownload 
                      title="Pre-Listing Preparation Checklist" 
                      description="Essential steps to take before listing your luxury property."
                      icon="fa-tasks" 
                      buttonText="Download Checklist" 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-display font-bold mb-6">Seller Consultation</h3>
                    <p className="text-neutral-200 mb-6">
                      Schedule a personalized consultation to discuss your property's value and my strategic marketing plan for luxury homes in The Ridges.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Comprehensive market analysis and pricing strategy</p>
                      </div>
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Professional photography, videography, and virtual tours</p>
                      </div>
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Targeted marketing to qualified luxury buyers</p>
                      </div>
                      <div className="flex items-start">
                        <i className="fas fa-check-circle text-secondary mr-3 mt-1"></i>
                        <p className="text-neutral-100">Expert negotiation for maximum value</p>
                      </div>
                    </div>
                    
                    <Link 
                      href="/contact"
                      className="block w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
                    >
                      Request Home Valuation
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mortgage" className="mt-6">
              <MortgageCalculator />
            </TabsContent>
            
            <TabsContent value="market" className="mt-6">
              <MarketReport />
            </TabsContent>
            
            <TabsContent value="valuation" className="mt-6">
              <HomeValuation />
            </TabsContent>
            
            <TabsContent value="relocation" className="mt-6">
              <RelocationInfo />
            </TabsContent>
            
            <TabsContent value="blog" className="mt-6">
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Luxury Real Estate Blog</h2>
                  <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                    Stay informed with the latest insights, trends, and news about luxury real estate in The Ridges Summerlin.
                  </p>
                </div>
                
                <p className="text-center text-lg text-neutral-600">
                  New local market updates are coming soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl text-neutral-200 mb-8">
            Whether you're buying, selling, or simply exploring your options, I'm here to provide expert guidance every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
            >
              Contact Dr. Jan Duffy
            </Link>
            <Link 
              href="/listings"
              className="px-8 py-3 bg-white text-primary hover:bg-neutral-100 font-secondary font-medium rounded transition-standard text-center"
            >
              View Luxury Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
