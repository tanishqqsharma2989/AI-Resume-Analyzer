async function analyzeResume() {

    const resume = document.getElementById("resumeText").value;
    const resultDiv = document.getElementById("result");

    if (!resume) {
        resultDiv.innerHTML = "Please paste resume first.";
        return;
    }

    resultDiv.innerHTML = "Analyzing Resume... Please wait.";

    try {

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert resume reviewer. Analyze resume and give: 1) Strengths 2) Weaknesses 3) Suggestions 4) ATS Score out of 100"
                    },
                    {
                        role: "user",
                        content: resume
                    }
                ]
            })
        });

        const data = await response.json();

        resultDiv.innerHTML =
            data.choices[0].message.content;

    } catch (error) {
        resultDiv.innerHTML = "Error analyzing resume. Check API key.";
        console.error(error);
    }
}
