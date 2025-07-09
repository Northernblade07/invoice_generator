import React, { useState } from 'react';
import { Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../lib/api';
import { Input } from '@/components/ui/input';
import Eclipse from '../components/Eclipse';

const RegisterPage = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const queryClient = useQueryClient();

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] })
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      alert('Please enter a valid email');
      return;
    }

    signupMutation(signupData);
  };

  return (
    <div className="relative z-0 bg-[#141414] h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="flex flex-col lg:flex-row w-full max-w-screen mx-auto rounded-xl overflow-hidden">
        {/* Left side */}
        <div className="flex items-start w-[630px] lg:w-1/2 sm:p-4 flex-col gap">
          <div className="h-[630px] w-[496px]">
            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <div className="space-y-6 w-[465px] overflow-hidden">
                <h2 className="text-5xl text-[#ffffff] font-semibold">Sign Up to Begin Journey</h2>
                <p className="text-[#A7A7A7]">This is a basic signup page</p>
              </div>

              <div className="space-y-6 mt-2">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-white font-semibold text-sm">Full Name</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#202020] w-full h-[60px]"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-white font-semibold text-sm">Email</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="bg-[#202020] w-full h-[60px]"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-white font-semibold text-sm">Password</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#202020] w-full h-[60px]"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex mt-4 gap-10">
                <button
                  className="btn bg-[#303030] text-[#CCF575] px-4 py-2 rounded-md"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? 'Loading...' : 'Register'}
                </button>

                <div className="text-center mt-4">
                  <Link className="hover:underline" to="/login">
                    <p className="text-sm font-serif text-[#B8B8B8]">Already have an account?</p>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <img
            src="/signup.png"
            alt="signup"
            className="object-cover overflow-hidden absolute right-[11px] rounded-bl-[60px] rounded-tl-[60px]"
            height={773}
            width={830}
          />
        </div>
      </div>

      <Eclipse color="#CCF575" blur="300px" className="absolute bottom-0 left-0 h-55 w-64" />
      <Eclipse color="#CCF575" blur="200px" className="z-0 absolute top-0 left-1/2 h-55 w-64" />
      <Eclipse color="#4F59A8" blur="100px" className="absolute top-0 right-0 h-55 w-64" />
    </div>
  );
};

export default RegisterPage;
