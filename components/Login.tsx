import React, { useState } from 'react';
import { loginWithGoogle } from '../services/firebase';
import { User } from '../types';
import { ALLOWED_EMAIL } from '../constants';
import { Lock, School } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      if (user.email !== ALLOWED_EMAIL) {
        setError(`접근 권한이 없습니다. (${ALLOWED_EMAIL} 계정만 가능)`);
        return;
      }
      onLogin(user);
    } catch (err: any) {
      setError("로그인 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <School className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">학생 관찰 기록 시스템</h1>
          <p className="text-blue-100 mt-2">교사 전용 서비스</p>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-8 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <Lock className="w-4 h-4" />
            <span className="text-sm">보안을 위해 지정된 계정으로 로그인하세요.</span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg font-medium transition-all ${
              loading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md'
            }`}
          >
            {loading ? (
              <span>로그인 중...</span>
            ) : (
              <>
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                <span>Google 계정으로 로그인</span>
              </>
            )}
          </button>
          
          <p className="mt-4 text-xs text-center text-gray-400">
            필수 계정: {ALLOWED_EMAIL}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
