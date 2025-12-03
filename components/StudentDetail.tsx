import React, { useState, useEffect } from 'react';
import { Student, ObservationRecord } from '../types';
import { generateComprehensiveOpinion } from '../services/geminiService';
import { 
  ClipboardList, 
  Calendar, 
  Sparkles, 
  FileText, 
  ChevronRight,
  UserCircle,
  Clock,
  X
} from 'lucide-react';

interface StudentDetailProps {
  student: Student;
  onAddRecord: (studentId: string, date: string, content: string) => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onAddRecord }) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [aiOpinion, setAiOpinion] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newContent, setNewContent] = useState('');

  // Set initial selected record when student changes
  useEffect(() => {
    if (student.records.length > 0) {
      setSelectedRecordId(student.records[0].id);
    } else {
      setSelectedRecordId(null);
    }
    // Restore cached opinion if exists, else clear
    setAiOpinion(student.generatedSummary || "");
  }, [student]);

  const selectedRecord = student.records.find(r => r.id === selectedRecordId);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const result = await generateComprehensiveOpinion(student.name, student.records);
      setAiOpinion(result);
      student.generatedSummary = result; // Cache it locally
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRecord = () => {
    if (!newContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    onAddRecord(student.id, newDate, newContent);
    setNewContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {student.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                {student.studentNumber}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <ClipboardList className="w-3 h-3" />
              관찰 기록 {student.records.length}건
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium flex items-center gap-2 transition-colors"
        >
          <FileText className="w-4 h-4" />
          누가기록 입력
        </button>
      </header>

      {/* Content Grid */}
      <div className="flex flex-1 overflow-hidden p-6 gap-6">
        
        {/* Left Column: Record List */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              관찰 기록 목록
            </h3>
            <span className="text-xs text-gray-400">날짜순</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {student.records.length === 0 ? (
              <div className="text-center text-gray-400 py-10 text-sm">기록이 없습니다.</div>
            ) : (
              <div className="space-y-2">
                {student.records.map((record) => (
                  <div
                    key={record.id}
                    onClick={() => setSelectedRecordId(record.id)}
                    className={`
                      p-4 rounded-lg cursor-pointer border transition-all relative group
                      ${selectedRecordId === record.id 
                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                        : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-bold ${selectedRecordId === record.id ? 'text-blue-700' : 'text-blue-500'}`}>
                        {record.date}
                      </span>
                      <div className="w-1.5 h-4 bg-yellow-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {record.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detail & AI */}
        <div className="w-2/3 flex flex-col gap-6 overflow-y-auto pr-1">
          
          {/* Selected Record Detail */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 flex flex-col shrink-0 min-h-[200px]">
             {selectedRecord ? (
                <>
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-blue-500" />
                      관찰 기록 상세
                    </h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {selectedRecord.date}
                    </span>
                  </div>
                  <div className="p-6 text-gray-700 leading-7 text-lg">
                    {selectedRecord.content}
                  </div>
                </>
             ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                  선택된 기록이 없습니다.
                </div>
             )}
          </div>

          {/* AI Section (Yellow Box) */}
          <div className="bg-white rounded-xl shadow-sm border border-yellow-200 flex flex-col flex-1 ring-4 ring-yellow-50/50">
            <div className="p-4 bg-yellow-50/30 border-b border-yellow-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <div className="bg-yellow-100 p-1 rounded text-yellow-600">
                  <ClipboardList className="w-4 h-4" />
                </div>
                종합 의견 (세부능력 및 특기사항)
              </h3>
              {!aiOpinion && !isGenerating && (
                <button 
                  onClick={handleGenerateAI}
                  className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  AI 자동 생성
                </button>
              )}
            </div>
            
            <div className="p-6 flex-1 bg-white rounded-b-xl relative">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                  <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-gray-500 animate-pulse">학생의 기록을 분석중입니다...</p>
                </div>
              ) : null}

              {aiOpinion ? (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-7 whitespace-pre-wrap text-justify">
                    {aiOpinion}
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button 
                       onClick={handleGenerateAI}
                       className="text-xs text-gray-400 hover:text-gray-600 underline"
                    >
                      다시 생성하기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 min-h-[150px]">
                  <Sparkles className="w-8 h-8 text-yellow-200" />
                  <p className="text-sm">관찰 기록을 바탕으로 AI가 종합 의견을 작성합니다.</p>
                  <button 
                    onClick={handleGenerateAI}
                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-medium shadow-sm shadow-yellow-200 transition-all transform hover:-translate-y-0.5"
                  >
                    AI로 내용 생성하기
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Add Record Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                관찰 기록 입력
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-blue-100 hover:text-white hover:bg-blue-500 rounded-full p-1 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">관찰 날짜</label>
                <input 
                  type="date" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">관찰 내용</label>
                <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="학생의 행동 특성이나 관찰 내용을 구체적으로 입력하세요..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                취소
              </button>
              <button 
                onClick={handleSaveRecord}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;