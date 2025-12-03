import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import StudentDetail from './components/StudentDetail';
import Login from './components/Login';
import { fetchStudents } from './services/firebase';
import { Student, User, ObservationRecord } from './types';
import { LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Initial Load (Simulating Auth Persistence check if using real Firebase)
  useEffect(() => {
    // In a real app, listen to onAuthStateChanged here.
  }, []);

  useEffect(() => {
    if (user) {
      setLoadingData(true);
      fetchStudents().then(data => {
        setStudents(data);
        if (data.length > 0) {
          // Default select the specific student from the screenshot logic (Park Na-yoon)
          // Or just the first one. Let's find "10411" to match screenshot if possible
          const park = data.find(s => s.studentNumber === "10411");
          setSelectedStudentId(park ? park.id : data[0].id);
        }
        setLoadingData(false);
      });
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setStudents([]);
    setSelectedStudentId(null);
  };

  const handleAddRecord = (studentId: string, date: string, content: string) => {
    setStudents(prevStudents => prevStudents.map(student => {
      if (student.id !== studentId) return student;
      
      const newRecord: ObservationRecord = {
        id: `rec-${Date.now()}`,
        date: date,
        content: content,
        authorId: user?.uid
      };
      
      // Create a new array with the new record at the beginning
      return {
        ...student,
        records: [newRecord, ...student.records]
      };
    }));
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar 
        students={students}
        selectedStudentId={selectedStudentId}
        onSelectStudent={setSelectedStudentId}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Top User Bar (Optional overlay or just part of the layout) */}
        <div className="bg-white border-b border-gray-200 px-6 py-2 flex justify-end items-center gap-4 text-sm">
           <div className="flex items-center gap-2">
             {user.photoURL && (
               <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full" />
             )}
             <span className="text-gray-600 font-medium">{user.displayName}</span>
             <span className="text-gray-400">({user.email})</span>
           </div>
           <button 
             onClick={handleLogout}
             className="text-gray-400 hover:text-red-500 transition-colors"
             title="로그아웃"
           >
             <LogOut className="w-4 h-4" />
           </button>
        </div>

        {/* Loading State or Detail View */}
        {loadingData ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          selectedStudentId && students.find(s => s.id === selectedStudentId) ? (
            <StudentDetail 
              student={students.find(s => s.id === selectedStudentId)!} 
              onAddRecord={handleAddRecord}
            />
          ) : (
             <div className="flex-1 flex items-center justify-center text-gray-400">
               학생을 선택해주세요.
             </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;