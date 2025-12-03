import { GoogleGenAI } from "@google/genai";
import { ObservationRecord } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateComprehensiveOpinion = async (
  studentName: string,
  records: ObservationRecord[]
): Promise<string> => {
  try {
    if (records.length === 0) {
      return "기록된 관찰 내용이 없어 종합 의견을 생성할 수 없습니다.";
    }

    const recordsText = records
      .map((r) => `- 날짜: ${r.date}\n- 내용: ${r.content}`)
      .join("\n\n");

    const prompt = `
      당신은 고등학교 담임 교사입니다. 아래는 '${studentName}' 학생에 대한 관찰 기록(행동 특성 및 종합 의견 기초 자료)입니다.
      이 기록들을 바탕으로 학교생활기록부의 '행동특성 및 종합의견' 또는 '세부능력 및 특기사항'에 들어갈 문구를 작성해주세요.
      
      [작성 원칙]
      1. 문체: '~함', '~임' 등의 개조식 종결어미가 아닌, '~하며', '~하는 모습을 보임', '~함' 등이 자연스럽게 섞인 공식적인 서술형 평어(평어체) 또는 격식있는 문어체로 작성하십시오. (예: 뛰어난 언어적 감각을 지니고 있으며...)
      2. 내용: 제공된 관찰 사실을 구체적인 근거로 활용하여, 학생의 인성, 학업 역량, 공동체 의식, 잠재력 등을 종합적으로 평가하십시오.
      3. 긍정적인 면을 부각하여 작성하십시오.
      4. 분량: 500자 내외의 하나의 완성된 문단으로 작성하십시오.

      [학생 관찰 기록]
      ${recordsText}
    `;

    // Using Flash for faster text generation
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7, // Slightly creative but grounded
      },
    });

    return response.text || "생성된 내용이 없습니다.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "AI 종합 의견 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};
