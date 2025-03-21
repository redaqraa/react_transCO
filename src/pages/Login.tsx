import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Effect to apply active class to inputs with values
    const inputs = document.querySelectorAll(".input-field");
    inputs.forEach((inp) => {
      const input = inp as HTMLInputElement;
      if (input.value !== "") {
        input.classList.add("active");
      }
    });
  }, [username, password, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Handle signup
      console.log('Signing up:', { username, email, password });
      
      // Check if username already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((user: any) => user.username === username || user.email === email);
      
      if (userExists) {
        toast.error('Account already exists', {
          description: 'This username or email is already registered. Please log in instead.'
        });
        return;
      }
      
      // Save new user
      users.push({
        id: Date.now(),
        username,
        email,
        password, // In a real app, never store passwords in plain text
        createdAt: new Date().toISOString()
      });
      
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ id: Date.now(), username, email }));
      
      toast.success('Account created successfully!', {
        description: 'Welcome to TransCO Travel.'
      });
    } else {
      // Handle login
      console.log('Logging in:', { username, password });
      
      // Check credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => 
        (u.username === username || u.email === username) && u.password === password
      );
      
      if (!user) {
        toast.error('Login failed', {
          description: 'Invalid username or password. Please try again.'
        });
        return;
      }
      
      // Save current user
      localStorage.setItem('currentUser', JSON.stringify({ 
        id: user.id,
        username: user.username, 
        email: user.email 
      }));
      
      toast.success('Login successful!', {
        description: 'Welcome back to TransCO Travel.'
      });
    }
    
    // Redirect to home page after login/signup
    navigate('/');
  };
  
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="box w-full max-w-5xl bg-white rounded-2xl shadow-elevated overflow-hidden">
        <div className="inner-box flex flex-col md:flex-row h-[600px]">
          {/* Forms Wrap */}
          <div className="forms-wrap md:w-1/2 p-8">
            {/* Sign In Form */}
            <form onSubmit={handleSubmit} autoComplete="off" className={isSignUp ? 'hidden' : 'block'}>
              <div className="logo mb-6">
                <h4 className="text-2xl font-bold">Trans <span className="text-transco-gold">CO</span></h4>
              </div>
              
              <div className="heading mb-8">
                <h2 className="text-2xl font-medium mb-2">Welcome Back</h2>
                <h6 className="text-gray-500">Not registered yet?</h6>
                <button 
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-transco-gold hover:underline"
                >
                  Sign up
                </button>
              </div>
              
              <div className="actual-form space-y-6">
                <div className="input-wrap relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-transco-gold transition-all"
                    required
                    minLength={4}
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300">
                    Username
                  </label>
                </div>
                
                <div className="input-wrap relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-transco-gold transition-all"
                    required
                    minLength={4}
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sign-btn bg-transco-gold hover:bg-transco-gold-dark text-white transition-all duration-300 py-3 h-auto"
                >
                  Sign In
                </Button>
              </div>
            </form>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} autoComplete="off" className={isSignUp ? 'block' : 'hidden'}>
              <div className="logo mb-6">
                <h4 className="text-2xl font-bold">Trans <span className="text-transco-gold">CO</span></h4>
              </div>
              
              <div className="heading mb-8">
                <h2 className="text-2xl font-medium mb-2">Get Started</h2>
                <h6 className="text-gray-500">Already have an account?</h6>
                <button 
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-transco-gold hover:underline"
                >
                  Sign in
                </button>
              </div>
              
              <div className="actual-form space-y-6">
                <div className="input-wrap relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-transco-gold transition-all"
                    required
                    minLength={4}
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300">
                    Username
                  </label>
                </div>
                
                <div className="input-wrap relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-transco-gold transition-all"
                    required
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300">
                    Email
                  </label>
                </div>
                
                <div className="input-wrap relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-transco-gold transition-all"
                    required
                    minLength={4}
                  />
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full sign-btn bg-transco-gold hover:bg-transco-gold-dark text-white transition-all duration-300 py-3 h-auto"
                >
                  Sign Up
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  By signing up, you agree to the
                  <Link to="/terms" className="text-transco-gold hover:underline mx-1">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Carousel Section */}
          <div className="carousel hidden md:block md:w-1/2 bg-center bg-cover h-full" 
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1566750687878-31db4c1f23d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80')"
               }}>
          </div>
        </div>
      </div>

      <style>
        {`
          .input-field.active + label,
          .input-field:focus + label {
            transform: translateY(-120%);
            font-size: 0.75rem;
            color: #D4A442;
          }
        `}
      </style>
    </main>
  );
};

export default Login;
