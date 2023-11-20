import OpenAI from "openai";

let openai:OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
  };
  openai = new OpenAI(configuration);
  console.log(openai.organization);
}

const createThankYouNote = async (question: string, answer: string) => {
  if(openai) {
    const completion = await openai.chat.completions.create({
      max_tokens: 64,
      temperature: 0.9,
      model: "text-davinci-003",
      messages: [{role: 'user', content: `Give a short snarky thank you to a person registering a vote in a poll.\nQuestion was: ${question}\nAnswer was: ${answer}`}]
    });
    console.log(completion);
    return completion.choices[0]?.message?.content?.replace(/^"/m, "").replace(/"$/m, "");
  }
  return "Thank you for voting!"
}

export default createThankYouNote;