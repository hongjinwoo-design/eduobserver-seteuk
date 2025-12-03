import React, { useState } from 'react';
import { Student } from '../types';
import { Search, User as UserIcon } from 'lucide-react';

interface SidebarProps {
  students: Student[];
  selectedStudentId: string | null;
  onSelectStudent: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ students, selectedStudentId, onSelectStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.includes(searchTerm) || s.studentNumber.includes(searchTerm)
  );

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-blue-600" />
          학생 명부
        </h2>
      </div>
      
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="이름 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-50">
          {filteredStudents.map((student) => {
            const isSelected = selectedStudentId === student.id;
            return (
              <li 
                key={student.id}
                onClick={() => onSelectStudent(student.id)}
                className={`cursor-pointer transition-colors hover:bg-gray-50 p-4 ${isSelected ? 'bg-blue-50/60' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                      {student.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {student.studentNumber}
                    </div>
                  </div>
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${isSelected ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-500'}
                  `}>
                    {student.records.length}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-center text-gray-500">
        총 {students.length}명
      </div>
    </div>
  );
};

export default Sidebar;
