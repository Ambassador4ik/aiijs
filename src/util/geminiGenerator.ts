import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyBmC87F6EMX0KcqqUBCYIzIQOm4Abnx6ZY');


const systemPrompt =
    "Дан список ограничений, необходимых для работе на вакансии:\
    Способ передвижения (1 пешком, 2 на коляске)\
    Зрение (1 нормальное, 2 слабовидящее, 3 незрячее)\
    Слух (1 нормальный, 2 слабослышащее, 3 глухое)\
    Моторика рук (1 нормальная, 2 ограниченная, 3 отсутствие одной из конечностей, 4 отсутствие обоих конечностей)\
    Речь (1 нормальная, 2 нарушенная, 3 отсутствие речи)\
    Когнитивные способности (1 нормальные, 2 ограниченные)\
    Психическое здоровье (1 стабильное, 2 нестабильное, 3 требующее поддержки)\
    Требуемый уровень физических усилий (1 минимальный, 2 средний, 3 высокий)\
    Уровень образования (1 без образования, 2 среднее, 3 высшее)\
    Навыки работы с компьютером (1 базовые, 2 средние, 3 продвинутые)\
    Опыт работы (1 нет опыта, 2 до 1 года, 3 1-3 года, 4 более 3 лет)\
    Коммуникационные навыки (1 не требуются, 2 базовые, 3 средние, 4 высокие)\
    Пользователь будет передавать тебе описание вакансии. Твоя задача - для каждой категории ограничений жизнедеятельности определить, какая максимальная (!) степень ограничения допустима для такой работы. Представь свой ответ в JSON формате списка из таких айтемов:\
    {category: String, max_restriction: Int, max_restriction_string: String  explanation: String}\
    explanation - кратко, не более 100 символов\
    Не нужно как-либо оформлять свой ответ, он обязан быть machine-parsable СРАЗУ.\
    Если нет возможности ответить на вопрос, вери пустой список."

interface Restriction {
    category: string;
    max_restriction: number;
    max_restriction_string: string;
    explanation: string;
}


const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: systemPrompt,
});

async function getGeminiAnswer(prompt: string) {
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 10000,
        },
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();
    const parsedData: Restriction[] = JSON.parse(text);
    return parsedData
}

export default getGeminiAnswer;